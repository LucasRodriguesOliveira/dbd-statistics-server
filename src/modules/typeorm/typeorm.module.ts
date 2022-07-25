import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from 'src/config/typeOrm/typeOrm-module.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleConfig)],
})
export class TypeOrmPostgreSQLModule {}
