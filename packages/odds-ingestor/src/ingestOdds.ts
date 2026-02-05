import { prisma } from '@asb/prisma';
import { normaliseEvents, normaliseH2HSnapshots, normaliseH2HMarkets } from './normaliser.js';
import { fetchOdds } from './apiClient.js';
import { Book } from './types.js';
import { eventNames } from 'node:cluster';


export async function ingestOdds() {
    const rawOdds = await fetchOdds();
    for (const rawEvent of rawOdds) {
        const event = normaliseEvents(rawEvent);
        console.log(event);
        if (!event) continue;


        await prisma.$transaction(async (tx) => {
            await tx.event.upsert({
                where: { id: event.id },
                create: {
                    id: event.id,
                    startTime: new Date(event.startTime),
                    sport: event.sport
                },
                update: {}
            });
            //console.log(`Ingesting event ${event.id} - ${event.sport} at ${event.startTime}`);
            
            for (const competitor of event.competitors) {
                await tx.competitor.upsert({
                    where: { id: competitor.id },
                    create: {
                        id: competitor.id,
                        name: competitor.name,
                        role: competitor.role,
                        eventId: event.id
                    },
                    update: {}
                });
            }

            for ( const book of Object.values(Book)) {
                const marketData = normaliseH2HMarkets(rawEvent, event, book);
                if (!marketData) continue;

                await tx.market.upsert({
                    where: { id: marketData.id },
                    create: {
                        id: marketData.id,
                        eventId: marketData.eventId,
                        book: marketData.book,
                        type: marketData.type,
                    },
                    update: {}
                });

                await tx.headToHeadMarket.upsert({
                    where: { marketId: marketData.id },
                    create: { marketId: marketData.id },
                    update: {}
                });

                for (const outcome of marketData.outcomes) {

                    const competitorExists = await tx.competitor.findUnique({
                        where: { id: outcome.competitorId }
                    });
                    if (!competitorExists) continue;

                    await tx.headToHeadOutcome.create({
                        data: {
                            id: crypto.randomUUID(),
                            marketId: marketData.id,  
                            competitorId: outcome.competitorId,
                            odds: outcome.odds
                        }
                    });
                }

                const snapshot = normaliseH2HSnapshots(marketData, event);
                await tx.oddsSummary.create({
                    data: {
                        id: snapshot.id,
                        eventId: snapshot.eventId,
                        marketType: snapshot.marketType,
                        book: snapshot.book,
                        capturedTimestamp: new Date(snapshot.capturedTimestamp),
                        outcomes: {
                            create: snapshot.outcomes.map(o => ({
                                id: crypto.randomUUID(),
                                outcomeKey: o.outcomeKey,
                                odds: o.odds
                            }))
                        }
                    }
                });
            }
        })
    }
}

