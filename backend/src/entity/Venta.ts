import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Usuario } from "./Usuario";
import { Documento } from "./Documento";
import { DetalleDocumento } from "./DetalleDocumento";

@Entity()
export class Venta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    usuario: Usuario;

    @OneToOne(type => Documento, Documento => Documento.id)
    @JoinColumn()
    documento: Documento;

    @Column({
      default: 1
    })
    activo: number;


}
