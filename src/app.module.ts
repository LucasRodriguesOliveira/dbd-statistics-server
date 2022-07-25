import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { TypeOrmPostgreSQLModule } from './modules/typeorm/typeorm.module';

@Module({
  imports: [ConfigModule.forRoot(envConfig), TypeOrmPostgreSQLModule],
})
export class AppModule {}
