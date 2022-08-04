import { PermissionGroup } from 'src/modules/permission-group/entities/permission-group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  description: string;

  @OneToMany(
    () => PermissionGroup,
    (permissionGroup) => permissionGroup.userType,
  )
  permissionGroups: PermissionGroup[];
}
