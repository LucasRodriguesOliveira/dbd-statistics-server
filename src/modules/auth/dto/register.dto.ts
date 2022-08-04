import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @MaxLength(100)
  @MinLength(8)
  password: string;
}
