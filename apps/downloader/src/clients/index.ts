import { DataSourceClient, IConfig, TweetClient } from '@watson/core';
import axios from 'axios';

const API_CONFIG: IConfig = {
  baseURL: process.env.WATSON_API_URL,
  apiKey: process.env.WATSON_API_KEY,
};

export const dataSourceClient = new DataSourceClient(API_CONFIG);

export const tweetClient = new TweetClient(API_CONFIG);

export const xClient = axios.create({
  baseURL: 'https://api.twitter.com/2',
  headers: {
    Authorization: `Bearer ${process.env.X_API_KEY}`,
  },
});
