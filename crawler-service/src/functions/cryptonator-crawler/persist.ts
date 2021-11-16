import { TickerByCurrencyPair } from './ticker';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

export async function persistTickers(tickers: TickerByCurrencyPair) {
  await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: 'tickers.json',
      Body: JSON.stringify(tickers),
    })
    .promise();
}
