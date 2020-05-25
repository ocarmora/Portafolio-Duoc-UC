import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Region {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    region: string;

    @Column({
      default: 1
    })
    activo: number;


}
