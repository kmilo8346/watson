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
  CreateFilter,
  SearchFiltersParams,
  UpdateFilter,
} from '@watson/models';
import { FiltersService } from './service';

@Controller('/v1/filters')
export class FiltersController {
  constructor(private readonly service: FiltersService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get('/')
  getAll(@Query() searchParams: SearchFiltersParams) {
    return this.service.getAll(searchParams);
  }

  @Post('/')
  async create(@Body() createFilter: CreateFilter) {
    return this.service.create(createFilter);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateFilter: UpdateFilter) {
    return this.service.update(id, updateFilter);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
