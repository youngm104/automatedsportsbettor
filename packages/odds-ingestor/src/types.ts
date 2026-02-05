import { Sport, Book, CompetitorRole, MarketType } from "@prisma/client";
export { Sport, Book }



export interface Event {
    id: string;
    startTime: string; // ISO 8601
    sport: Sport;
    competitors: Competitor[]; 
};

export interface Competitor {
    id: string;
    name: string;
    role: CompetitorRole;
};

export type Market = HeadToHeadMarket | SpreadMarket | TotalsMarket;

export interface BaseMarket {
    id: string;
    eventId: string;
    book: Book;
};

export interface HeadToHeadMarket extends BaseMarket {
    type: "H2H";
    outcomes: HeadToHeadOutcome[];
};
   
export interface HeadToHeadOutcome {
    competitorId: string;
    odds: number;
};

export interface SpreadMarket extends BaseMarket {
    type: 'spreads';
    line: number;
    outcomes: SpreadOutcome[];
};

export interface SpreadOutcome {
    competitorId: string;
    handicap: number;
    odds: number;
};

export interface TotalsMarket extends BaseMarket {
    types: 'totals';
    line: number;
    outcomes: TotalOutcome[];
};

export interface TotalOutcome {
    side: 'over' | 'under';
    odds: number
};

export interface PricedOutcome {
    outcomeKey: string; // for reliable comparison (stable hash)
    odds: number;
};

export interface OddsSummary {
    id: string;
    eventId: string;
    marketType: MarketType; //keeping one for now
    book: Book;
    outcomes: PricedOutcome[];
    capturedTimestamp: string; // ISO
};

// Odds Api Data

export interface RawOddsData {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: RawBookMakersOdds[];
};

export interface RawBookMakersOdds {
    key: string;
    title: string;
    last_update: string;
    markets: RawMarketData[] | RawMarketDataH2H[];
};

export interface RawMarketData {
    key: string;
    last_update: string;
};

export interface RawMarketDataH2H extends RawMarketData {
    outcomes: RawOutcomes[];
}

export interface RawOutcomes {
    name: string;
    price: number;
};