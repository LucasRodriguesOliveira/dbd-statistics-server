import { User } from '../../../modules/user/entities/user.entity';
import { UserTokenType } from '../../../modules/user-token-type/entities/user-token-type.entity';

export class CreateUserTokenDto {
  tokenType: UserTokenType;
  user: User;
  expiresAt: Date;
}
