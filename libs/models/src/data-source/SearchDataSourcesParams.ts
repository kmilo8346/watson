import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { SearchParams } from '../core';

class Filter {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  enabled?: boolean;
}

export class SearchDataSourcesParams extends SearchParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => Filter)
  override filter?: Filter;
}
