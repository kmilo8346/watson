import { CreateTweet, Tweet, UpdateTweet } from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class TweetClient extends RESTClient<Tweet, CreateTweet, UpdateTweet> {
  constructor(config: IConfig) {
    super(config, 'tweets');
  }
}
