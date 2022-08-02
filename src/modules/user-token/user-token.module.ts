import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { User } from '../user/user.entity';
import { UserToken } from './entities/user-token.entity';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken, UserTokenType, User])],
  providers: [UserTokenService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
