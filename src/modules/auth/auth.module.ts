import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTModuleConfig } from 'src/config/jwt/jwt-module.config';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { UserToken } from '../user-token/entities/user-token.entity';
import { UserTokenModule } from '../user-token/user-token.module';
import { UserType } from '../user-type/entities/user-type.entity';
import { UserTypeModule } from '../user-type/user-type.module';
import { UserTypeService } from '../user-type/user-type.service';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToken, UserTokenType, UserType]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JWTModuleConfig()),
    UserTokenModule,
    UserModule,
    UserTypeModule,
  ],
  providers: [AuthService, JwtStrategy, UserService, UserTypeService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
