import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class CategoriaProducto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoria: string;

    @Column({
      default: 1
    })
    activo: number;


}
