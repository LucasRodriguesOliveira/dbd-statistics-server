import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserTokenTypeDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
