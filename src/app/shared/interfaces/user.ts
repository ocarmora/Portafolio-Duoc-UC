import { UserDetail } from './user-detail';
import { UserType } from './user-type';

export interface User extends UserDetail, UserType {
  rut: string,
  password: string,
  tipoUsuario: UserType,
  detalle: UserDetail,
  activo: number
}
