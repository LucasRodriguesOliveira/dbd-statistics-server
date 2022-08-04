import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PerkType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  description: string;
}
