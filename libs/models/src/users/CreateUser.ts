import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  data_source_ids!: string[];
}
