import {
  CreateDataSource,
  DataSource,
  SearchDataSourcesParams,
  UpdateDataSource,
} from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class DataSourceClient extends RESTClient<
  DataSource,
  CreateDataSource,
  UpdateDataSource,
  SearchDataSourcesParams
> {
  constructor(config: IConfig) {
    super(config, 'data-sources');
  }
}
