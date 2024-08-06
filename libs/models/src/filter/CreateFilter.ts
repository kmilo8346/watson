import {
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFilter {
  @IsNotEmpty()
  @IsString()
  data_source_id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  ai_instruction!: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean = true;
}
