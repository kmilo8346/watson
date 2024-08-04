import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateTweet {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter_ids?: string[];
}
