import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
