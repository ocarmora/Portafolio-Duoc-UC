import { ProductCategory } from './product-category';
import { User } from 'src/app/shared/interfaces/user';

export interface Product {
  id: number,
  codigoDeBarra: number,
  descripcion: string,
  precioNeto: number,
  stockCritico: number,
  activo: number,
  proveedor: User,
  categoriaProducto: ProductCategory
}
