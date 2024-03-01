import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PerfilAcesso } from "./perfildeacesso.entity";
import { Pagina } from "./pagina.entity";
@Entity()

export class AcessoLiberacao {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => PerfilAcesso)
    @JoinColumn({ name: "idPerfilAcesso" })
    idPerfilAcesso: PerfilAcesso

    @ManyToOne(() => Pagina)
    @JoinColumn({ name: "idPagina", referencedColumnName: "id" })
    idPagina: Pagina

    @Column({ type: "boolean" })
    visualisar: boolean

    @Column({ type: "boolean" })
    editar: boolean

    @Column({ type: "boolean" })
    excluir: boolean
}