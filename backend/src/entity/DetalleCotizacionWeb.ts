import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Usuario } from "./Usuario";
import { CotizacionWeb } from "./CotizacionWeb";
import { Producto } from "./Producto";

@Entity()
export class DetalleCotizacionWeb {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @Column()
    precioNeto: number;

    @Column()
    subtotalNeto: number;

    @ManyToOne(type => CotizacionWeb, CotizacionWeb => CotizacionWeb.id)
    cotizacionWeb: CotizacionWeb;

    @ManyToOne(type => Producto, Producto => Producto.id)
    producto: Producto;

    @Column()
    activo: number;

}
