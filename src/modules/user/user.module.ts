import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserType } from '../user-type/entities/user-type.entity';
import { UserTypeModule } from '../user-type/user-type.module';
import { UserTypeService } from '../user-type/user-type.service';
import { UserToken } from '../user-token/entities/user-token.entity';
import { UserTokenModule } from '../user-token/user-token.module';
import { UserTokenService } from '../user-token/user-token.service';
import { UserTokenTypeModule } from '../user-token-type/user-token-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserType, UserToken]),
    UserTypeModule,
    UserTokenModule,
    UserTokenTypeModule,
  ],
  providers: [UserService, UserTypeService, UserTokenService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
