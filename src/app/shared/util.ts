import Swal from "sweetalert2";

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
