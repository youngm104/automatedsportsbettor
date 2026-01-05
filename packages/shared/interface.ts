export type Book = 'bet365' | 'betfair' | 'pinnacle' | 'dabble' | 'sportsbet' ;
export type Sport = 'tennis' | 'basketball' | 'cricket' | 'football' | 'american football';

export interface Event {
    id: string;
    timestamp: string;
    sport: string;
    markets: Market[];   
};

export interface Outcome {

};

export interface Market {
    id: string;
    eventId: string;
    type: 'h2h' | 'spreads' | 'totals';
};

export interface OddsSummary {
    book: Book;
    marketId: string;
    selection: string;
    odds: number; // decimal odds
    timestamp: string;
};