import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SearchParams } from '../core';

class FilterIds {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  $in!: string[];
}

class Filter {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  data_source_id?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterIds)
  filter_ids?: FilterIds;
}

export class SearchTweetsParams extends SearchParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => Filter)
  override filter?: Filter;
}
