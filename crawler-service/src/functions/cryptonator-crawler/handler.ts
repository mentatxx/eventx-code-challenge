import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { crawlCryptonator } from './crawl';
import { persistTickers } from './persist';
import schema from './schema';

const crawl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const tickers = await crawlCryptonator([
    'btc-usd',
    'eth-usd',
    'ltc-usd',
    'xmr-usd',
    'xrp-usd',
    'doge-usd',
    'dash-usd',
    'maid-usd',
  ]);
  await persistTickers(tickers);
  return formatJSONResponse({
    message: 'Done',
    tickers,
  });
};

export const main = middyfy(crawl);
