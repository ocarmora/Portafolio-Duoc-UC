import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Producto } from "./Producto";
import { OrdenDeCompra } from "./OrdenDeCompra";

@Entity()
export class DetalleOrdenDeCompra {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Producto, Producto => Producto.id)
    producto: Producto;

    @ManyToOne(type => OrdenDeCompra  , OrdenDeCompra => OrdenDeCompra.id)
    ordenDeCompra: OrdenDeCompra;

    @Column({
      default: 1
    })
    activo: number;


}
