import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserTokenTypeDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
