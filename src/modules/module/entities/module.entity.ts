import { PermissionGroup } from 'src/modules/permission-group/entities/permission-group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Module {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  description: string;

  @OneToMany(() => PermissionGroup, (permissionGroup) => permissionGroup.module)
  permissionGroups: PermissionGroup[];
}
