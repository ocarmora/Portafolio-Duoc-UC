export enum UserType{
  Admin     = 1,
  Cliente   = 2,
  Vendedor  = 3,
  Proveedor = 4,
  Empleado  = 5,
  Empresa   = 6
}

export function pad(n: any, width: number, z?: string) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const firstLetterCapitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
