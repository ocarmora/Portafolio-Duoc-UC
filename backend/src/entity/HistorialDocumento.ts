import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Documento } from "./Documento";
import { Usuario } from "./Usuario";

@Entity()
export class HistorialDocumento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detalle: string;

    @Column()
    fecha: string;

    @ManyToOne(type => Documento, Documento => Documento.id)
    documento: Documento;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    usuario: Usuario;

    @Column()
    activo: number;

}
