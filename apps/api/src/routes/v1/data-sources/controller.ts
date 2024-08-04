import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  CreateDataSource,
  SearchDataSourcesParams,
  UpdateDataSource,
} from '@watson/models';
import { DataSourcesService } from './service';

@Controller('/v1/data-sources')
export class DataSourcesController {
  constructor(private readonly service: DataSourcesService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get('/')
  getAll(@Query() searchParams: SearchDataSourcesParams) {
    return this.service.getAll(searchParams);
  }

  @Post('/')
  async create(@Body() createDataSource: CreateDataSource) {
    return this.service.create(createDataSource);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDataSource: UpdateDataSource
  ) {
    return this.service.update(id, updateDataSource);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
