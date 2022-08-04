import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateModuleDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
