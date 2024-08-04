import { Entity } from '../core';

export class Tweet extends Entity {
  id!: string;
  author_id!: string;
  data_source_id!: string;
  filter_ids!: string[];
  text!: string;
  public_metrics!: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    bookmark_count: number;
    impression_count: number;
  };
  created_at!: string;
}
