import { Type } from 'class-transformer';
import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class PublicMetrics {
  @IsNotEmpty()
  @IsNumber()
  retweet_count!: number;

  @IsNotEmpty()
  @IsNumber()
  reply_count!: number;

  @IsNotEmpty()
  @IsNumber()
  like_count!: number;

  @IsNotEmpty()
  @IsNumber()
  quote_count!: number;

  @IsNotEmpty()
  @IsNumber()
  bookmark_count!: number;

  @IsNotEmpty()
  @IsNumber()
  impression_count!: number;
}

export class CreateTweet {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  author_id!: string;

  @IsNotEmpty()
  @IsString()
  data_source_id!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter_ids?: string[] = [];

  @IsNotEmpty()
  @IsString()
  text!: string;

  @ValidateNested()
  @Type(() => PublicMetrics)
  public_metrics!: PublicMetrics;

  @IsNotEmpty()
  @IsISO8601()
  created_at!: string;
}
