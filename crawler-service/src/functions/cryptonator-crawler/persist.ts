import * as AWS from 'aws-sdk';
import { TickerByCurrencyPair } from './ticker';

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function persistTickers(tickers: TickerByCurrencyPair) {
  await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: 'tickers.json',
      Body: JSON.stringify(tickers),
    })
    .promise();
}
