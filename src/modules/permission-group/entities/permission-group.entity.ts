import { Module } from 'src/modules/module/entities/module.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { UserType } from 'src/modules/user-type/entities/user-type.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionGroup {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => UserType, (type) => type.permissionGroups, {
    nullable: false,
  })
  @JoinColumn({ name: 'typeId' })
  userType: UserType;

  @ManyToOne(() => Permission, (permission) => permission.permissionGroups, {
    nullable: false,
  })
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;

  @ManyToOne(() => Module, (module) => module.permissionGroups, {
    nullable: false,
  })
  @JoinColumn({ name: 'moduleId' })
  module: Module;
}
