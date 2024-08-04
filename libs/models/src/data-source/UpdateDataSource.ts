import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class XQuery {
  @IsString()
  @IsNotEmpty()
  list_id!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  next_token?: string;
}

export class UpdateDataSource {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => XQuery)
  x_query?: XQuery;
}
