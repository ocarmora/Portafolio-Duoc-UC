import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

@Entity()
export class TipoDocumento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;

    @Column()
    activo: number;

}
