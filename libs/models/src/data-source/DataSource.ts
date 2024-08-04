import { Entity } from '../base/Entity';

export class DataSource extends Entity {
  name!: string;
  description!: string;
  enabled!: boolean;
  x_query!: {
    list_id: string;
    next_token?: string;
  };
}
