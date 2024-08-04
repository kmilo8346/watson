import { CreateDataSource, DataSource, UpdateDataSource } from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class DataSourceClient extends RESTClient<
  DataSource,
  CreateDataSource,
  UpdateDataSource
> {
  constructor(config: IConfig) {
    super(config, 'data-sources');
  }
}
