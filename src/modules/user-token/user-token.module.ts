import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { UserTokenTypeModule } from '../user-token-type/user-token-type.module';
import { UserTokenTypeService } from '../user-token-type/user-token-type.service';
import { UserToken } from './entities/user-token.entity';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserToken, UserTokenType]),
    UserTokenTypeModule,
  ],
  providers: [UserTokenService, UserTokenTypeService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
