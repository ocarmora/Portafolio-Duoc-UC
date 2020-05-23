import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class CategoriaProducto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoria: string;

    @Column()
    activo: number;

}
