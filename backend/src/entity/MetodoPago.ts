import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class MetodoPago {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodo: string;

  @Column({
    default: 1
  })
  activo: number;

}
