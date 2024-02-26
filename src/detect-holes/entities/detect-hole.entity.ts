import { Usuario } from "src/login/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
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
        type: 'datetime'
    })
    dataCadastro: Date

    @Column({
        type: "datetime"
    })
    dataCorrecao: Date

    @Column()
    rua: string

    @Column()
    bairro: string

    @Column()
    aprovacao: boolean
}
