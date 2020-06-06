import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Producto } from "./Producto";
import { OrdenDeCompra } from "./OrdenDeCompra";

@Entity()
export class DetalleOrdenDeCompra {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(type => Producto, Producto => Producto.detalleOrdenDeCompra)
  producto: Producto;

  @ManyToOne(type => OrdenDeCompra, ordenDeCompra => ordenDeCompra.detalle)
  ordenDeCompra: OrdenDeCompra;

  @Column({
    default: 1
  })
  activo: number;
}
