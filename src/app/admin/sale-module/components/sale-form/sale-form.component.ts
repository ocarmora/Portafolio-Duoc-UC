import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { firstLetterCapitalize, Toast, rutify, validateRut, SwalConfirm } from 'src/app/shared/util';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {

  barcode: any;

  documentTypes: any = [];
  documentTypeSelected: any = {};

  paymentMethods: any = [];
  paymentMethodselected: any = {};

  customerRut: string;
  customerDetail: any;
  customerNotExist: any = false;

  customer: any = {
    id: '',
    rut : '',
    razonSocial: '',
    direccion: '',
    comuna: '',
    telefono: '',
    correoElectronico: '',
    personaContacto: ''
  }

  productsByBarcode: any = [];

  products: any[] = [];

  subTotal: number = 0;

  currentUser: any;

  constructor(private _saleService: SaleService, private _authService: AuthService, private _router: Router){ }

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getPaymentMethods();
    this.getCurrentUser();
  }

  // Get auth user
  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

  // Get document types (boleta, factura)
  getDocumentTypes(){
    this._saleService.getAll().subscribe((result: any) => {
      result.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.tipo),
          value: element
        }
        this.documentTypes.push(obj);
      });
    });
  }

  // Get payment methods available (boleta, factura)
  getPaymentMethods(){
    this._saleService.getPaymentMethods().subscribe((result: any) => {
      result.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.metodo),
          value: element
        }
        this.paymentMethods.push(obj);
      });
    })
  }

  // Get customer detail from rut input
  getCustomerDetail(){

    if(!validateRut(this.customerRut)){
      Swal.fire({
        icon: 'warning',
        title: 'RUT inválido',
        text: 'El formato del RUT ingresado no es válido',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'Entendido'
      });

      this.customerNotExist = false;
      document.getElementById('rutInput').focus();
      return;
    }

    this._saleService.getCustomerDetail(this.customerRut).subscribe((result: any) => {
      this.customerDetail = result;

      this.customer.id = result.id ? result.id : '';
      this.customer.rut = this.customerRut ? this.customerRut : '';
      this.customer.razonSocial = result.detalle.nombre ? result.detalle.nombre : '';
      this.customer.direccion = result.detalle.direccion ? result.detalle.direccion: '';
      this.customer.comuna = result.detalle.comuna ? result.detalle.comuna: '';
      this.customer.correoElectronico = result.detalle.email ? result.detalle.email : '';
      this.customer.telefono = result.detalle.telefono ? result.detalle.telefono : '';
      this.customer.personaContacto = result.detalle.personaContacto ? result.detalle.personaContacto : '';

      this.customerNotExist = false;

    }, () => {

      if(this.customerDetail){

        this.customer.id = 0;
        this.customer.rut = this.customerRut;
        this.customer.razonSocial = '';
        this.customer.direccion = '';
        this.customer.comuna = '';
        this.customer.correoElectronico = '';
        this.customer.telefono = '';
        this.customer.personaContacto = '';

      }

      this.customer.rut = this.customerRut;

      let razonSocialInput = document.getElementById('razonSocial');
      razonSocialInput.focus();

      Swal.fire({
        icon: 'info',
        title: 'RUT no registrado',
        html: 'Ingresa los datos de la empresa para facturar. <br/> <strong>Se generará una contraseña con los primeros 6 dígitos del RUT</strong>',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'Entendido'
      })
      this.customerNotExist = true;
    });
  }

  // Set rut format to input
  rutFormat(input: any){
    if(input.value.length <= 1){
      return;
    }

    this.customerRut = rutify(input.value);
  }

  // API - search product by barcode
  searchByBarCode(){
    this._saleService.searchProduct(this.barcode).subscribe((result: any) => {
      if(result.stock > 0){
        this.addProduct(result);
      }else{
        let ac: any = document.getElementById('barcodeInput');

        Swal.fire({
          icon: 'warning',
          title: 'Producto sin stock',
          html: '<strong>' + result.descripcion + '</strong> no tiene stock',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          confirmButtonText: 'Entendido'
        });

        ac.value = '';
      }
    });
  }

  // Add product finded to document
  addProduct(product: any){
    let isInArray: boolean = false;
    let ac: any = document.getElementById('barcodeInput');

    this.products.forEach(element => {
      if(element.id == product.id){
        isInArray = true;
        element.cantidad += 1;
      }

      this.validateStock(element);
    });

    if(!isInArray){
      // Push product to array
      this.products.push(product);

      // Set cantidad to 1 for ngModel on frontend table
      let index: number = this.products.indexOf(product);
      this.products[index].cantidad = 1;
    }

    this.calculateSubtotal()
    ac.value = '';
  }

  // Validate product quantity with stock
  validateStock(product: any){
    if(product.cantidad > product.stock){
      Swal.fire({
        icon: 'warning',
        title: 'No hay suficiente stock',
        html: 'El stock actual de <strong>' + product.descripcion + '</strong> es de <strong>' + product.stock + ' productos </strong>',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        confirmButtonText: 'Utilizar stock'
      }).then(result => {
        if(result.value){
          product.cantidad = product.stock
        }else{
          product.cantidad = 1;
        }
        this.calculateSubtotal();
      });
    }else if(product.cantidad <= 0){
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad incorrecta',
        html: 'La cantidad mínima permitida es de 1 producto',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        confirmButtonText: 'Entendido'
      });
      product.cantidad = 1;
    }
    else{
      this.calculateSubtotal();
    }
  }

  // Calculate total price of products on array
  calculateSubtotal(){
    this.subTotal = 0;
    this.products.forEach(element => {
      let productTotal = element.cantidad * element.precioNeto;
      this.subTotal += productTotal;
    })
  }

  // Remove product from products array
  removeProduct(product: any){
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    this.calculateSubtotal();

  }

  // Send data to controller: make sell
  sendForm(){
    let obj = {
      documentType: this.documentTypeSelected,
      paymentMethod: this.paymentMethodselected,
      customer: this.customer,
      products: {
        total: this.subTotal,
        products: this.products
      },
      currentUser: this.currentUser
    }

    SwalConfirm.fire({
      icon: 'info',
      title: 'Confirmar Venta',
      html: 'Realizarás una <strong>' + obj.documentType.tipo + '</strong> por monto de <strong>$' + obj.products.total + '</strong> + IVA',
      customClass: {
        confirmButton: 'btn btn-primary ml-3',
        cancelButton: 'btn btn-secondary'
      },
      confirmButtonText: 'Confirmar'
    }).then(result => {
      if(result.value){
        this._saleService.sale(obj).subscribe((response) => {
          Toast.fire({
            icon: 'success',
            titleText: 'Venta generada'
          });
          return this._router.navigate(['/admin/ventas']);
        }, (error) => {
            Toast.fire({
              icon: 'error',
              titleText: 'Inténtalo nuevamente'
            })
        })
      }
    })

  }

}
