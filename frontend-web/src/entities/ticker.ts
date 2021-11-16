export interface Ticker {
  base: string;
  target: string;
  price: string;
  volume: string;
  change: string;
}

export type TickerServiceResponse = Record<string, Ticker | null>;
