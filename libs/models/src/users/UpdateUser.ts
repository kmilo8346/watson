import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUser {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  data_source_ids?: string[];
}
