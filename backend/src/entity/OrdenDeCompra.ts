import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class OrdenDeCompra {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    proveedor: Usuario;

    @Column({
      default: 1
    })
    activo: number;


}
