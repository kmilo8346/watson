import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SearchParams } from '../core';

class Filter {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  data_source_id?: string;
}

export class SearchTweetsParams extends SearchParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => Filter)
  override filter?: Filter;
}
