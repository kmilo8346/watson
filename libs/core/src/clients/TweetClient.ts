import {
  CreateTweet,
  SearchTweetsParams,
  Tweet,
  UpdateTweet,
} from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class TweetClient extends RESTClient<
  Tweet,
  CreateTweet,
  UpdateTweet,
  SearchTweetsParams
> {
  constructor(config: IConfig) {
    super(config, 'tweets');
  }
}
