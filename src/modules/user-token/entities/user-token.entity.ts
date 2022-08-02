import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../modules/user/user.entity';
import { UserTokenType } from '../../../modules/user-token-type/entities/user-token-type.entity';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  token: string;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => UserTokenType, (tokenType) => tokenType.tokens)
  @JoinColumn({ name: 'tokenTypeId' })
  tokenType: UserTokenType;
}
