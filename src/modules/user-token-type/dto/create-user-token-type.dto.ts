import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { UserTokenTypeEnum } from './user-token-type.enum';

export class CreateUserTokenTypeDto {
  @MaxLength(30)
  @IsNotEmpty()
  @IsEnum(UserTokenTypeEnum)
  description: UserTokenTypeEnum;
}
