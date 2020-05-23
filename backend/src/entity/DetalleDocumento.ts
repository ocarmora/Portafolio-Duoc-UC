import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Producto } from "./Producto";
import { Documento } from "./Documento";

@Entity()
export class DetalleDocumento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @Column()
    precioNeto: number;

    @Column()
    subtotalNeto: number;

    @ManyToOne(type => Producto, Producto => Producto.id)
    producto: Producto;

    @ManyToOne(type => Documento, Documento => Documento.id)
    documento: Documento;

    @Column()
    activo: number;
}
