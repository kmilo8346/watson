import { Inject, Injectable } from '@nestjs/common';
import { CreateFilter, Filter, UpdateFilter } from '@watson/models';
import { DBService } from 'apps/api/src/lib';
import { MongoClient } from 'mongodb';

@Injectable()
export class FiltersService extends DBService<
  Filter,
  CreateFilter,
  UpdateFilter
> {
  constructor(@Inject('MONGO_CLIENT') mongoClient: MongoClient) {
    super(mongoClient, 'filters');
  }
}
