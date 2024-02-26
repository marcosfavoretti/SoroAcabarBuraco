import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class PerfilAcesso {
    @PrimaryGeneratedColumn()
    idPerfil: number
    @Column()
    descricao: string
}