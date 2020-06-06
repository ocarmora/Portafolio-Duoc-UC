import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { OrdenDeCompra } from "./OrdenDeCompra";
import { Usuario } from "./Usuario";

@Entity()
export class HistorialOrdenDeCompra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detalle: string;

    @Column()
    fecha: string;

    @ManyToOne(type => OrdenDeCompra, OrdenDeCompra => OrdenDeCompra.id)
    ordenDeCompra: OrdenDeCompra;

    @ManyToOne(type => Usuario  , Usuario => Usuario.id)
    usuario: Usuario;

    @Column({
      default: 1
    })
    activo: number;


}
