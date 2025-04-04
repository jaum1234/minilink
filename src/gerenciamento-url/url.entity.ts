// src/url/url.entity.ts
import { Usuario } from 'src/identidade-usuario/usuario.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LogAcesso } from './log_acesso.entity';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
    name: 'origem',
    nullable: false
  })
  origem!: string;

  @Column({ 
    type: 'varchar',
    length: 80, 
    name: 'encurtada', 
    unique: true 
  })
  @Index({ unique: true })
  encurtada!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  deletedAt!: Date | null;

  @OneToMany(() => LogAcesso, (logAcesso) => logAcesso.url)
  acessos!: LogAcesso[];

  @ManyToOne(() => Usuario, (usuario) => usuario.urls, { onDelete: 'CASCADE' })
  usuario!: Usuario;
}
