import Swal from "sweetalert2";
import { setupTestingRouter } from '@angular/router/testing';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export function rutify(inputStr: any){
  let str = inputStr.split('-');
  let rutWF: string = '';
  str.forEach(element => rutWF += element);

  let pre = rutWF.slice(0, rutWF.length -1);
  let dv = rutWF.substr(-1);
  let rut = pre + '-' + dv;
  return rut;
}

export function validateRut(rut: any) {

    // Despejar Guión
    let valor = rut.replace('-','');

    // Aislar Cuerpo y Dígito Verificador
    let cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();

    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
    let index = 0;

    // Para cada dígito del Cuerpo
    for(let i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv){
      return false;
    }

    return true;
}

export enum UserRole {
  Admin = 1,            // administrador
  CustomerPerson = 2,   // cliente persona
  SalesEmployee = 3,    // vendedor
  Provider = 4,         // proveedor
  Employee = 5,         // empleado
  CustomerCompany = 6   // cliente empresa
}

export const SwalConfirm = Swal.mixin({
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Eliminar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
  customClass: {
    confirmButton: 'btn btn-danger m-1',
    cancelButton: 'btn btn-secondary m-1'
  },
  buttonsStyling: false
})

export function toLowerCase(obj: any) {
  if (!obj) {
    return;
  }
  if (typeof obj !== 'object') {
    return;
  }
  var keys = Object.keys(obj);
  var result = {};
  keys.map(function(k, v) {
    if (typeof k === 'string') {
      if (typeof obj[k] === 'string') {
        result[k] = obj[k].toLowerCase();
      } else {
        // if the node is an object, perform the same process over that node
        if (typeof obj[k] === 'object') {
          result[k] = toLowerCase(obj[k]);
        } else {
          result[k] = obj[k];
        }
      }
    }
  });
  return result;
}

export const firstLetterCapitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export enum UserType{
  Admin     = 1,
  Cliente   = 2,
  Vendedor  = 3,
  Proveedor = 4,
  Empleado  = 5,
  Empresa   = 6
}
