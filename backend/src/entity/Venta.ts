import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Usuario } from "./Usuario";
import { Documento } from "./Documento";

@Entity()
export class Venta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    usuarioId: Usuario;

    @OneToOne(type => Documento, Documento => Documento.id)
    @JoinColumn()
    documento: Documento;

    @Column()
    activo: number;

}
