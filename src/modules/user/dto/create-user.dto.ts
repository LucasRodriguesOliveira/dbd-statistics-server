import { IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @MaxLength(100)
  password: string;
}
