import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class CategoriaProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria: string;

  @OneToMany(type => Producto, producto => producto.categoriaProducto)
  producto: Producto[];

  @Column({
    default: 1
  })
  activo: number;
}
