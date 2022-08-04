import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserTypeDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
