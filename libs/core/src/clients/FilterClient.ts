import { CreateFilter, Filter, UpdateFilter } from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class FilterClient extends RESTClient<
  Filter,
  CreateFilter,
  UpdateFilter
> {
  constructor(config: IConfig) {
    super(config, 'filters');
  }
}
