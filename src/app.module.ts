import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { PerkTypeModule } from './modules/perk-type/perk-type.module';
import { TypeOrmPostgreSQLModule } from './modules/typeorm/typeorm.module';
import { UserTokenType } from './modules/user-token-type/entities/user-token-type.entity';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmPostgreSQLModule,
    PerkTypeModule,
    UserTokenType,
  ],
})
export class AppModule {}
