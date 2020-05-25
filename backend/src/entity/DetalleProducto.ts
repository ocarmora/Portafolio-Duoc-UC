import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class DetalleProducto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: number;

    @Column()
    stock: number;

    @Column()
    fechaVencimiento: string;

    @ManyToOne(type => Producto, Producto => Producto.id)
    producto: Producto;

    @Column({
      default: 1
    })
    activo: number;

}
