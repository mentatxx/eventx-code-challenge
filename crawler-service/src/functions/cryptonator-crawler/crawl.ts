import axios from 'axios';
import { Ticker, TickerByCurrencyPair } from './ticker';

interface CryptonatorResponse {
  ticker: Ticker;
  success: boolean;
  error: string;
}

export async function crawlCryptonator(
  currencyPairs: string[],
): Promise<TickerByCurrencyPair> {
  const tickers = await Promise.all(
    currencyPairs.map((currencyPair) =>
      crawlOneCurrencyPair(currencyPair).catch<Ticker | null>((err) => {
        console.error(err);
        return null;
      }),
    ),
  );
  const result = currencyPairs.reduce<TickerByCurrencyPair>(
    (acc, currencyName, index) => {
      acc[currencyName] = tickers[index];
      return acc;
    },
    {},
  );
  return result;
}

async function crawlOneCurrencyPair(currencyPair: string): Promise<Ticker> {
  // Result is similar to
  const response = await axios.get<CryptonatorResponse>(
    `https://api.cryptonator.com/api/ticker/${currencyPair}`,
  );
  if (!response.data.success) {
    throw new Error(response.data.error);
  }
  return response.data.ticker;
}
