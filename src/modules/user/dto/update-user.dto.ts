import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
