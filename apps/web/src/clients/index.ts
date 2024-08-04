import {
  IConfig,
  AuthClient,
  UserClient,
  DataSourceClient,
  TweetClient,
  FilterClient,
} from '@watson/core';
import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { authenticator } from '../lib';

const REST_CONFIG: IConfig = {
  baseURL: `${import.meta.env.VITE_WATSON_API_URL}/v1`,
  requestInterceptor: {
    onFulfilled: async (config: InternalAxiosRequestConfig) => {
      if (!config) {
        return config;
      }
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      const auth = await authenticator.getAuthFromStorage();
      if (auth === null) {
        return config;
      }

      config.headers['Authorization'] = `${auth.token_type.toLowerCase()} ${
        auth.access_token
      }`;

      return config;
    },
    onRejected: (error: any) => {
      throw error;
    },
  },
  responseInterceptor: {
    onFulfilled: (response: AxiosResponse) => response,
    onRejected: (error: any) => {
      if (!error.response) {
        throw error;
      }

      switch (error.response.status) {
        case 401:
          authenticator.signOut();
          throw error;
        case 403:
          throw error;
        default:
          throw error;
      }
    },
  },
};

export const authClient = new AuthClient(REST_CONFIG);

export const userClient = new UserClient(REST_CONFIG);

export const dataSourceClient = new DataSourceClient(REST_CONFIG);

export const tweetClient = new TweetClient(REST_CONFIG);

export const filterClient = new FilterClient(REST_CONFIG);
