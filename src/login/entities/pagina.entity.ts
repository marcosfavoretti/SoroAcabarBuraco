import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Pagina{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nome: string
}