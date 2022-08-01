import { IsEmail, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(100)
  name?: string;

  @MaxLength(100)
  @IsEmail()
  email?: string;

  @MaxLength(100)
  password?: string;
}
