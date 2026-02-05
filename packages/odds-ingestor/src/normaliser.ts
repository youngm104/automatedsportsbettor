import { RawOddsData, Event, Sport, Competitor, Book, RawBookMakersOdds, RawMarketData, RawMarketDataH2H, HeadToHeadMarket, OddsSummary } from "./types.js";
import { stringToSport, stringToBook, generateId } from "./helper.js";


export function normaliseEvents(apiResponse: RawOddsData) : Event |  undefined {

    const sport: Sport | undefined = stringToSport(apiResponse.sport_key); 
    const competitors: Competitor[] | undefined = normaliseCompetitors(apiResponse);
    if (!sport || !competitors) return undefined;

    return { id: generateId(), startTime: apiResponse.commence_time, sport: sport, competitors: competitors };
};

export function normaliseCompetitors(apiResponse: RawOddsData): Competitor[] | undefined {
    const competitors:Competitor[] = [
        { id: generateId(), name: apiResponse.home_team, role: 'HOME'},
        { id: generateId(), name: apiResponse.away_team, role: 'AWAY'}
    ];
    
    return competitors;
}

export function normaliseH2HMarkets(apiResponse: RawOddsData, event: Event, book: Book): HeadToHeadMarket | undefined {
    const bookmakersData: RawBookMakersOdds[] = apiResponse.bookmakers;
    const bookmaker: RawBookMakersOdds | undefined = bookmakersData.find(x => x.key === book);
    if (!bookmaker) return undefined;
    const rawMarketData: RawMarketDataH2H | undefined = bookmaker.markets.find(x => x.key === 'h2h') as RawMarketDataH2H | undefined;
    if (!rawMarketData) return undefined;
    
    return {
        id: generateId(),
        eventId: event.id,
        book: book,
        type: 'H2H',
        outcomes: rawMarketData.outcomes.map( x => {
            const competitor = event.competitors.find( c => c.name === x.name );
            if (!competitor) {
                throw new Error(`Unknown competitor ${x.name}`);
            } 
            return {
                competitorId: competitor.id,
                odds: x.price
            };
        }) 
    };
}

export function normaliseH2HSnapshots(
    market: HeadToHeadMarket,
    event: Event
): OddsSummary {
    return {
        id: generateId(),
        eventId: event.id,
        marketType: 'H2H',
        book: market.book,
        capturedTimestamp: new Date().toISOString(),
        outcomes: market.outcomes.map(o => {
            const competitor = event.competitors.find(
                c => c.id === o.competitorId
            );

            if (!competitor) {
                throw new Error('Competitor missing for snapshot');
            }

            return {
                outcomeKey: `h2h:${competitor.role}`,
                odds: o.odds
            };
        })
    };
}
