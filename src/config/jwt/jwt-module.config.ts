import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { JWTConfig } from '../env/jwt.config';

export const JWTModuleConfig = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const { expiresIn, secret } = configService.get<JWTConfig>('jwt');

    return {
      secret,
      signOptions: {
        expiresIn,
      },
    };
  },
});
