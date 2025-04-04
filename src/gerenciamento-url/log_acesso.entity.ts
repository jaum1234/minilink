// src/access-log/access-log.entity.ts
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Url } from './url.entity';

@Entity()
export class LogAcesso {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Url, (url) => url.acessos, { onDelete: 'CASCADE' })
  url!: Url;
}
