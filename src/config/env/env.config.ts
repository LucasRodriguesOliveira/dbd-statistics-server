import { ConfigModuleOptions } from '@nestjs/config';
import { appLoadEnv } from './app.load';
import { jwtLoadEnv } from './jwt.config';
import { typeOrmLoadEnv } from './typeOrm.config';

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [appLoadEnv, typeOrmLoadEnv, jwtLoadEnv],
};
