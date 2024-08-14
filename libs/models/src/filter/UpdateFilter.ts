import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class LastFiltered {
  @IsNotEmpty()
  @IsISO8601()
  date!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  cumulative_total!: number;
}

export class UpdateFilter {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ai_instruction?: string;

  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  scope_authors?: string[];

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastFiltered)
  last_filtered?: LastFiltered;
}
