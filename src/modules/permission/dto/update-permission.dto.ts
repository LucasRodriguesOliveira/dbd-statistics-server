import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePermissionDto {
  @MaxLength(30)
  @IsNotEmpty()
  description: string;
}
