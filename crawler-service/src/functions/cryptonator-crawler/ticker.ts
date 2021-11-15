export interface Ticker {
  base: string;
  target: string;
  price: string;
  volume: string;
  change: string;
}

export type TickerByCurrencyPair = Record<string, Ticker | null>;
