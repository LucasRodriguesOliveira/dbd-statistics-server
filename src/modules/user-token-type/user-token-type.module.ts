import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenTypeController } from './user-token-type.controller';
import { UserTokenType } from './entities/user-token-type.entity';
import { UserTokenTypeService } from './user-token-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTokenType])],
  controllers: [UserTokenTypeController],
  providers: [UserTokenTypeService],
  exports: [UserTokenTypeService],
})
export class UserTokenTypeModule {}
