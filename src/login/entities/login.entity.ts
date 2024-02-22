import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  iduser: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;
}