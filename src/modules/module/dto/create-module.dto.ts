import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateModuleDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
