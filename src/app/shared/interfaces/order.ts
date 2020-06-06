import { User } from './user';

export interface Order extends User {
  id: number,
  activo: number,
  comentario: string,
  pagoFacturaDias: number,
  metodoDePago: string,
  proveedor: User
}
