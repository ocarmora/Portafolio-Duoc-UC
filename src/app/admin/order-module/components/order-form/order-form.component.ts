import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { OrderService } from '../../services/order.service';
import { firstLetterCapitalize, Toast, SwalConfirm } from 'src/app/shared/util';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { PaymentMethodService } from 'src/app/shared/services/payment-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  providers: SelectItem[] = [];
  providerSelected: any;
  products: SelectItem[] = [];
  paymentMethods: SelectItem[] = [];
  paymentMethodsSelected: any;
  orderProducts = [];
  orderCommentary: string;
  orderPaymentDay: number = 30;
  currentUser: any;

  constructor(private _orderService: OrderService, private _authService: AuthService, private _paymentMethodService: PaymentMethodService,private _router: Router) { }

  ngOnInit(): void {
    this.getProviders();
    this.getCurrentUser();
    this.getPaymentMethods();
  }

  getProviders(){
    this._orderService.getProviders().subscribe((results: any) => {
      results.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.detalle.nombre),
          value: element
        };
        this.providers.push(obj);
      });
    })
  }

  getProductsFromProvider(data: any){
    this.products = [];
    this._orderService.getProductsFromProvider(data.id).subscribe((results: any) => {
      results.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.descripcion),
          value: {
            id: element.id,
            producto: element,
            cantidad: 1
          }
        };
        this.products.push(obj);
      });
    });
  }

  getPaymentMethods(){
    this._paymentMethodService.getPaymentMethods().subscribe(result => {
      result.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.metodo),
          value: element
        };
        this.paymentMethods.push(obj);
      });
    });
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

  removeElementFromOrder(id: number){
    const index = this.orderProducts.findIndex(obj => obj.id == id);
    this.orderProducts.splice(index, 1);
  }

  sendData(){

    let isValid: boolean = true;

    this.orderProducts.forEach(element => {

      if(!element.precioUnidad){
        isValid = false;
      }

      if(!isValid){
        Swal.fire({
          icon:'warning',
          title: 'Solicitud incompleta',
          text: 'Debes ingresar el precio de compra de todos los productos',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
          confirmButtonText: 'Entendido'
        });
      }
      return;
    });

    if(!isValid){
      return;
    }

    let data = {
      comentario: this.orderCommentary,
      pagoFacturaDias: this.orderPaymentDay,
      metodoDePago: this.paymentMethodsSelected,
      proveedor: this.providerSelected,
      productos: this.orderProducts,
      usuario: this.currentUser
    }

    SwalConfirm.fire({
      icon: 'info',
      title: 'Confirmar Orden de Compra',
      html: 'Generarás una nueva orden de compra para <strong>' + this.providerSelected.detalle.nombre + '</strong>',
      customClass: {
        confirmButton: 'btn btn-primary ml-3',
        cancelButton: 'btn btn-secondary'
      },
      confirmButtonText: 'Confirmar OC'
    }).then(result => {
      if(result.value){
        this._orderService.create(data).subscribe(result => {
          Toast.fire({
            titleText: 'Orden de compra generada',
            icon: 'success'
          });
          return this._router.navigate(['/admin/ordenes-de-compra']);
        },
        () => {
          Toast.fire({
            titleText: 'Inténtalo nuevamente',
            icon: 'error'
          });
        });
      }else{
        return;
      }
    }).catch(() => {
      return;
    });

  }

}
