import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { UserTokenTypeModule } from '../user-token-type/user-token-type.module';
import { UserTokenTypeService } from '../user-token-type/user-token-type.service';
import { UserToken } from '../user-token/entities/user-token.entity';
import { UserTokenModule } from '../user-token/user-token.module';
import { UserTokenService } from '../user-token/user-token.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToken, UserTokenType]),
    UserTokenModule,
    UserTokenTypeModule,
  ],
  providers: [UserService, UserTokenService, UserTokenTypeService],
  controllers: [UserController],
})
export class UserModule {}
