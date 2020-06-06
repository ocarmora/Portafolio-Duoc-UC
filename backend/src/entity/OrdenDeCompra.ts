import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Usuario } from "./Usuario";
import { DetalleOrdenDeCompra } from "./DetalleOrdenDeCompra";
import { HistorialOrdenDeCompra } from "./HistorialOrdenDeCompra";

@Entity()
export class OrdenDeCompra {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: true
    })
    comentario: string;

    @Column()
    pagoFacturaDias: number;

    @Column()
    metodoDePago: string;

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    proveedor: Usuario;

    @OneToMany(type => DetalleOrdenDeCompra, detalleOrdenDeCompra => detalleOrdenDeCompra.ordenDeCompra)
    detalle: DetalleOrdenDeCompra[];

    @OneToMany(type => HistorialOrdenDeCompra, historialOrdenDeCompra => historialOrdenDeCompra.ordenDeCompra)
    historial: HistorialOrdenDeCompra[];

    @Column({
      default: 1
    })
    activo: number;


}
