import { Entity } from '../core';

export class Filter extends Entity {
  data_source_id!: string;
  name!: string;
  description!: string;
  ai_instruction!: string;
  enabled!: boolean;
  last_analized_date?: string;
}
