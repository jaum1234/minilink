import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Url } from '../gerenciamento-url/url.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  senha!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Url, (url) => url.usuario)
  urls!: Url[];
}
