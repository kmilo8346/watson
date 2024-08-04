import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { SearchParams } from '../rest';

class Filter {}

export class SearchUsersParams extends SearchParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => Filter)
  override filter?: Filter;
}
