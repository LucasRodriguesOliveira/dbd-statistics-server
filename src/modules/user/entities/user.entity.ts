import { UserType } from 'src/modules/user-type/entities/user-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserToken } from '../../user-token/entities/user-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;

  @Column({ default: false, nullable: false })
  isActive: boolean;

  @ManyToOne(() => UserType, (type) => type.users)
  @JoinColumn({ name: 'typeId' })
  type: UserType;

  @OneToMany(() => UserToken, (token) => token.user)
  tokens?: UserToken[];
}
