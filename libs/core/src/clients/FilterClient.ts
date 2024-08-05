import {
  CreateFilter,
  Filter,
  SearchFiltersParams,
  UpdateFilter,
} from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class FilterClient extends RESTClient<
  Filter,
  CreateFilter,
  UpdateFilter,
  SearchFiltersParams
> {
  constructor(config: IConfig) {
    super(config, 'filters');
  }
}
