import { Entity } from '../core';

export class DataSource extends Entity {
  name!: string;
  description!: string;
  enabled!: boolean;
  x_query!: {
    list_id: string;
    next_token?: string;
  };
}
