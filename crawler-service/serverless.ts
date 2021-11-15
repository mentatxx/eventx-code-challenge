import type { AWS } from '@serverless/typescript';
import crawler from './src/functions/cryptonator-crawler';

const serverlessConfiguration: AWS = {
  service: 'cryptonator-crawler',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    profile: "${file(./config/${opt:stage, 'dev'}.json):profile}",
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: '*',
        Resource: "${file(./config/${opt:stage, 'dev'}.json):S3URN}",
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { crawler },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
