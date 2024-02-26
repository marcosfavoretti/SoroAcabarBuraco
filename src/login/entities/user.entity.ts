import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PerfilAcesso } from './acessos.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  iduser: number;

  @ManyToOne(() => PerfilAcesso)
  @JoinColumn({ name: 'idPerfil' })
  idPerfil: PerfilAcesso

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;


  @Column({ type: 'decimal', precision: (10), scale: (2) })
  rank: string;

  @Column()
  telefone: string
}