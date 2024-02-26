import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";
@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'idUsuario' })
    idUsuario: number

    @Column()
    rua: string

    @Column()
    bairro: string


    @Column()
    numero: number


    @Column({
        type: 'varchar',
        length: 8
    })
    cep: string
}