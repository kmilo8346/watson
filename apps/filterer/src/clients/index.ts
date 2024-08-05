import {
  DataSourceClient,
  FilterClient,
  IConfig,
  TweetClient,
} from '@watson/core';

const API_CONFIG: IConfig = {
  baseURL: process.env.WATSON_API_URL,
  apiKey: process.env.WATSON_API_KEY,
};

export const dataSourceClient = new DataSourceClient(API_CONFIG);

export const filterClient = new FilterClient(API_CONFIG);

export const tweetClient = new TweetClient(API_CONFIG);
