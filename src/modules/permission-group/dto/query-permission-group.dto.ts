import { IsNumber } from 'class-validator';

export class QueryPermissionGroupDto {
  @IsNumber()
  permission?: number;

  @IsNumber()
  module?: number;

  @IsNumber()
  type?: number;

  @IsNumber()
  page?: number = 1;
}
