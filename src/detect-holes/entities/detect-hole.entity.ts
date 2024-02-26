import { Usuario } from "src/login/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Patalogia {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "idUsuario" })
    idUsuario: number

    @Column({ type: 'decimal', precision: 10, scale: 8 })
    latitude: number

    @Column({ type: 'decimal', precision: 10, scale: 8 })
    longitude: number

    @Column()
    foto: string

    @Column()
    descricao: string

    @Column({
        type: 'smalldatetime'
    })
    dataCadastro: Date

    @Column({
        type: "smalldatetime"
    })
    dataCorrecao: Date

    @Column()
    rua: string

    @Column()
    bairro: string

}
