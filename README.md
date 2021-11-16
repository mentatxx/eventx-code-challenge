# eventx-code-challenge
Code challenge for EventX

Using the [Cryptonator](https://www.cryptonator.com/) show exchange rate for some cryptocurrencies.
Rates are updated each minute.

Demo available at [eventx.mentatxx.com](https://eventx.mentatxx.com)

Primary goals:
* Scalable
* Cheap
* Built with React/Node

## System design
![](https://eventx.mentatxx.com/EventX.png)

*crawl-service* is a serverless function (AWS Lambda) which is executed every minute and fetches information from Cryptonator and stores it S3 bucket *eventx-data*

React application (*frontend-web*) is published to *eventx-web* S3 bucket.

Both buckets are published to Internet through CloudFront CDN, with routing: /tickers.json is served from eventx-data bucket, all other requests are served from *eventx-web* bucket
