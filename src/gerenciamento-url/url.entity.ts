// src/url/url.entity.ts
import { Usuario } from 'src/identidade-usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LogAcesso } from './log_acesso.entity';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
    name: 'origem',
    nullable: false,
  })
  origem!: string;

  @Column({
    type: 'varchar',
    length: 80,
    name: 'encurtada',
    unique: true,
  })
  @Index("IDX_ENCURTADA", { unique: true })
  encurtada!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @OneToMany(() => LogAcesso, (logAcesso) => logAcesso.url)
  acessos!: LogAcesso[];

  @ManyToOne(() => Usuario, (usuario) => usuario.urls, { onDelete: 'CASCADE' })
  usuario!: Usuario;
}
