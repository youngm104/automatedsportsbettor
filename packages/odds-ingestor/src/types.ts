export enum Book {
  BET365 = 'bet365',
  BETFAIR = 'betfair',
  PINNACLE = 'pinnacle',
  DABBLE = 'dabble',
  SPORTSBET = 'sportsbet',
}

export enum Sport {
  TENNIS = 'tennis',
  BASKETBALL = 'basketball',
  CRICKET = 'cricket',
  FOOTBALL = 'football',
  AMERICAN_FOOTBALL = 'american_football',
}

export interface Event {
    id: string;
    startTime: string; // ISO 8601
    sport: Sport;
    competitors: Competitor[]; 
};

export interface Competitor {
    id: string;
    name: string;
    role: 'home' | 'away' | 'neutral';
}

export type Market = HeadToHeadMarket | SpreadMarket | TotalsMarket;

export interface BaseMarket {
    id: string;
    eventId: string;
    book: Book;
}

export interface HeadToHeadMarket extends BaseMarket {
    type: 'h2h';
    outcomes: HeadToHeadOutcome[];
}

export interface HeadToHeadOutcome {
    competitorId: string;
    odds: number;
}

export interface SpreadMarket extends BaseMarket {
    type: 'spreads';
    line: number;
    outcomes: SpreadOutcome[];
}

export interface SpreadOutcome {
    competitorId: string;
    handicap: number;
    odds: number;
}

export interface TotalsMarket extends BaseMarket {
    types: 'totals';
    line: number;
    outcomes: TotalOutcome[];
}

export interface TotalOutcome {
    side: 'over' | 'under';
    odds: number
}

export interface PricedOutcome {
    outcomeKey: string; // for reliable comparison (stable hash)
    odds: number;
};

export interface OddsSummary {
    marketId: string;
    book: Book;
    outcomes: PricedOutcome[];
    capturedTimestamp: string; // ISO
};