import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Usuario } from "./Usuario";
import { TipoDocumento } from "./TipoDocumento";

@Entity()
export class Documento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    correlativo: number;

    @Column()
    fechaCreacion: string;

    @Column()
    totalNeto: number;

    @ManyToOne(type => TipoDocumento, TipoDocumento => TipoDocumento.id)
    tipoDocumento: TipoDocumento;

    @ManyToOne(type => Usuario, Usuario => Usuario.id, {nullable: true})
    cliente: Usuario;

    @Column({
      default: 1
    })
    activo: number;


}
