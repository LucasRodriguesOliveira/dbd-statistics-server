import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../env/typeOrm.config';

export const typeOrmModuleConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const { host, port, username, password, database } =
      configService.get<TypeOrmConfig>('database');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
    };
  },
};
