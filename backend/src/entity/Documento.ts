import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Usuario } from "./Usuario";
import { TipoDocumento } from "./TipoDocumento";
import { DetalleDocumento } from "./DetalleDocumento";

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

    @OneToMany(type => DetalleDocumento, detalleDocumento => detalleDocumento.documento)
    productos: DetalleDocumento[];

    @Column({
      default: 1
    })
    activo: number;


}
