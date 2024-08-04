import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class XQuery {
  @IsNotEmpty()
  @IsString()
  list_id!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  next_token?: string;
}

export class CreateDataSource {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsBoolean()
  enabled: boolean = true;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => XQuery)
  x_query!: XQuery;
}
