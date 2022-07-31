import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { PerkTypeModule } from './modules/perk-type/perk-type.module';
import { TypeOrmPostgreSQLModule } from './modules/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmPostgreSQLModule,
    PerkTypeModule,
  ],
})
export class AppModule {}
