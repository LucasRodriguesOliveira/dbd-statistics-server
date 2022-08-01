import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
