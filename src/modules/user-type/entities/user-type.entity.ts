import { PermissionGroup } from 'src/modules/permission-group/entities/permission-group.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserType {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  description: string;

  @OneToMany(() => User, (user) => user.type)
  users: User[];

  @OneToMany(
    () => PermissionGroup,
    (permissionGroup) => permissionGroup.userType,
  )
  permissionGroups: PermissionGroup[];
}
