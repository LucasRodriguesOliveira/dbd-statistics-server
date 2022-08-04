import { Module } from 'src/modules/module/entities/module.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { UserType } from 'src/modules/user-type/entities/user-type.entity';

export class UpdatePermissionGroupDto {
  userType?: UserType;
  permission?: Permission;
  module?: Module;
}
