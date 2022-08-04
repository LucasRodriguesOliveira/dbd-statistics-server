import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { AuthModule } from './modules/auth/auth.module';
import { ModuleModule } from './modules/module/module.module';
import { PerkTypeModule } from './modules/perk-type/perk-type.module';
import { PermissionGroupModule } from './modules/permission-group/permission-group.module';
import { PermissionModule } from './modules/permission/permission.module';
import { TypeOrmPostgreSQLModule } from './modules/typeorm/typeorm.module';
import { UserTokenTypeModule } from './modules/user-token-type/user-token-type.module';
import { UserTokenModule } from './modules/user-token/user-token.module';
import { UserTypeModule } from './modules/user-type/user-type.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmPostgreSQLModule,
    AuthModule,
    PerkTypeModule,
    UserTokenTypeModule,
    UserTokenModule,
    UserModule,
    UserTypeModule,
    PermissionModule,
    ModuleModule,
    PermissionGroupModule,
  ],
})
export class AppModule {}
