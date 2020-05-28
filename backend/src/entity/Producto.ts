import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { CategoriaProducto } from "./CategoriaProducto";
import { Usuario } from "./Usuario";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoDeBarra: number;

    @Column()
    descripcion: string;

    @Column()
    precioNeto: number;

    @Column()
    stockCritico: number;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    proveedor: Usuario;

    @ManyToOne(type => CategoriaProducto, CategoriaProducto => CategoriaProducto.id)
    categoriaProducto: CategoriaProducto;

    @Column({
      default: 1
    })
    activo: number;


}
