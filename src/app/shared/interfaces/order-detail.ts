import { Product } from './product';
import { Order } from './order';

export interface OrderDetail extends Product, Order {
  id: number,
  activo: number,
  producto: Product,
  ordenDeCompra: Order
  cantidad: number
}
