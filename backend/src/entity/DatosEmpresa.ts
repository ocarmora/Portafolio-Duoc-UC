import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Comuna } from "./Comuna";

@Entity()
export class DatosEmpresa {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razonSocial: string;

  @Column()
  rut: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @ManyToOne(type => Comuna, comuna => comuna.id)
  comuna: Comuna;

}
