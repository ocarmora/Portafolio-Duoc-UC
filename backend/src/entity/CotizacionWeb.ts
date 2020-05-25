import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class CotizacionWeb {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @Column()
    fechaExpiracion: string;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    cliente: Usuario;

    @Column({
      default: 1
    })
    activo: number;


}
