import { User } from './user';

export interface Order extends User {
  id: number,
  activo: number,
  comentario: string,
  historial: any,
  pagoFacturaDias: number,
  metodoDePago: string,
  proveedor: User
}
