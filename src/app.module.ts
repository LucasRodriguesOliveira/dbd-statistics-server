import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { PerkTypeModule } from './modules/perk-type/perk-type.module';
import { TypeOrmPostgreSQLModule } from './modules/typeorm/typeorm.module';
import { UserTokenTypeModule } from './modules/user-token-type/user-token-type.module';
import { UserTokenModule } from './modules/user-token/user-token.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmPostgreSQLModule,
    PerkTypeModule,
    UserTokenTypeModule,
    UserTokenModule,
    UserModule,
  ],
})
export class AppModule {}
