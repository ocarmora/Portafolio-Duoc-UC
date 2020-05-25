import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Region } from "./Region";

@Entity()
export class Comuna {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comuna: string;

    @ManyToOne(type => Region, Region => Region.id)
    region: Region;

    @Column({
      default: 1
    })
    activo: number;

}
