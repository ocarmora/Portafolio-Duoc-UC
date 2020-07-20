import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { TipoUsuario } from "./TipoUsuario";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true
    })
    rut: string;

    @Column()
    password: string;

    @Column("simple-json")// json
    detalle: {};

    @ManyToOne(type => TipoUsuario, tipoUsuario => tipoUsuario.id)
    tipoUsuario: TipoUsuario;

    @Column({
      default: 1
    })
    habilitado: boolean

    @Column({
      default: 1
    })
    activo: number;

}
