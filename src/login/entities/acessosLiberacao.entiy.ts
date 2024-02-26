import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PerfilAcesso } from "./perfildeacesso.entity";
import { Pagina } from "./pagina.entity";
@Entity()

export class AcessoLiberacao {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => PerfilAcesso)
    @JoinColumn({ name: "idPerfilAcesso" })
    idPerfilAcesso: PerfilAcesso

    @OneToOne(() => Pagina)
    @JoinColumn({ name: "idPagina" })
    idPagina: Pagina

    @Column()
    visualisar: boolean

    @Column()
    editar: boolean

    @Column()
    excluir: boolean
}