// src/access-log/access-log.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Url } from './url.entity';

@Entity()
export class LogAcesso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'url_id' })
  urlId!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @ManyToOne(() => Url, (url) => url.acessos, { onDelete: 'CASCADE' })
  url!: Url;
}
