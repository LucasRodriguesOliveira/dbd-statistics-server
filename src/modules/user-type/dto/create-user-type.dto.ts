import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserTypeDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
