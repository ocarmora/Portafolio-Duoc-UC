import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { CategoriaProducto } from "./CategoriaProducto";
import { Usuario } from "./Usuario";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: number;

    @Column()
    codigoDeBarra: string;

    @Column()
    descripcion: string;

    @Column()
    precioNeto: number;

    @Column()
    fechaVencimiento: string;

    @Column()
    stock: number;

    @Column()
    stockCritico: number;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    proveedor: Usuario;

    @ManyToOne(type => CategoriaProducto, CategoriaProducto => CategoriaProducto.id)
    categoriaProducto: CategoriaProducto;

    @Column()
    activo: number;

}
