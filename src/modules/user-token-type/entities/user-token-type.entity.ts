import { UserToken } from '../../../modules/user-token/entities/user-token.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTokenType {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  description: string;

  @OneToMany(() => UserToken, (token) => token.tokenType)
  tokens: UserToken[];
}
