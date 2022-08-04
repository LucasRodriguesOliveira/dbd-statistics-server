import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from '../../config/typeOrm/typeOrm-module.config';
import { PerkType } from '../perk-type/entities/perk-type.entity';
import { Permission } from '../permission/entities/permission.entity';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { UserToken } from '../user-token/entities/user-token.entity';
import { UserType } from '../user-type/entities/user-type.entity';
import { User } from '../user/entities/user.entity';
import * as ModuleEntity from '../module/entities/module.entity';
import { PermissionGroup } from '../permission-group/entities/permission-group.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      typeOrmModuleConfig([
        PerkType,
        UserTokenType,
        UserToken,
        User,
        UserType,
        Permission,
        ModuleEntity.Module,
        PermissionGroup,
      ]),
    ),
  ],
})
export class TypeOrmPostgreSQLModule {}
