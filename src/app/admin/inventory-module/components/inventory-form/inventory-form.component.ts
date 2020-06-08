import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/admin/order-module/services/order.service';
import { Order } from 'src/app/shared/interfaces/order';
import { SelectItem } from 'primeng/api/selectitem';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as Moment from 'moment';
import { SwalConfirm, Toast } from 'src/app/shared/util';

declare var $: any;

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {

  orders: SelectItem[] = [];
  orderSelected: any;
  productCheck: string[] = []; // VB checkbox
  expirationDates = [];
  modalClose: boolean = false;
  productExpirationDate: any = {
    index: 0,
    quantity: '',
    date: '',
  };

  constructor(private _orderService: OrderService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.getOpenOrders();

    $('#expirationDateModal').on('hide.bs.modal', (e) => {
      this.checkExpiratioDates(e);
    });

  }

  getOpenOrders(){
    this._orderService.getOpenOrders().subscribe((result: Order[]) => {
      result.forEach((element: any) => {

        // let total: number = 0;
        // element.detalle.forEach(product => {
        //   let subtotal = product.cantidad * product.producto.precioNeto;
        //   total += subtotal;
        // });

        let obj = {
          id: element.id,
          label: 'OC Nº ' + element.id + ' | ' + element.proveedor.detalle.nombre, //+ ' | Total: $' + total
          value: element
        };
        this.orders.push(obj);
      });
      this.setOrderByParam();
    });
  }

  setOrderByParam(){
    this._activatedRoute.params.subscribe(params => {
      if(!params['id']){
        return;
      }
      const id = params['id'];
      this._orderService.getOrderDetail(id).subscribe(result => {
        this.orderSelected = result;
      });
    });
  }

  expirationDateModal(index: number){
    $("#expirationDateModal").modal('show');
    this.productExpirationDate.index = index;
  }

  onAddExpirationDate(){
    let moment = Moment;
    let today = moment();
    let inputDate = moment(this.productExpirationDate.date, "DD/MM/YYYY");

    // Validate date on input date
    if(!inputDate.isValid()){
      return Swal.fire({
        icon: 'warning',
        title: 'Fecha incorrecta',
        text: 'La fecha de vencimiento que ingresaste no es válida',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      });
    }

    // Validate if input date is before today
    if(moment(inputDate).isBefore(today)){
      return Swal.fire({
        icon: 'warning',
        title: 'Fecha incorrecta',
        text: 'El producto que estás ingresando parece estar vencido',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      });
    }

    let obj = {
      quantity: this.productExpirationDate.quantity,
      date: this.productExpirationDate.date,
    }

    let detalleFechasVencimiento = this.expirationDates;

    if(obj.quantity > this.orderSelected.detalle[this.productExpirationDate.index].cantidad){
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad incorrecta',
        text: 'La cantidad ingresada no puede ser mayor al total del producto en la orden de compra',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      });

      this.productExpirationDate.quantity = '';
      this.productExpirationDate.date = '';

      return;

    }else{
      if(this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento){

        let sumCantidad: number = 0;

        this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.forEach(element => {
          sumCantidad += element.quantity;
        });

        if((obj.quantity + sumCantidad) > this.orderSelected.detalle[this.productExpirationDate.index].cantidad){
          Swal.fire({
            icon: 'warning',
            title: 'Cantidad incorrecta',
            text: 'La cantidad ingresada no puede ser mayor al total del producto en la orden de compra',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
            confirmButtonText: 'Entendido'
          });

          this.productExpirationDate.quantity = '';
          this.productExpirationDate.date = '';

          return;

        }else{

          let elementIndex: number = 0;
          let dateExist: boolean = false;

          this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.forEach((element: any) => {
            if(element.date == obj.date){
              dateExist = true;
              elementIndex = this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.indexOf(element);
            }
          });

          if(dateExist){
            this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento[elementIndex].quantity += obj.quantity
          }else{
            this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.push(obj);
          }

        }
      }else{
        this.expirationDates.push(obj);
        this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento = detalleFechasVencimiento;
      }
    }

    this.productExpirationDate.quantity = '';
    this.productExpirationDate.date = '';
    this.expirationDates = [];

  }

  removeExpirationDate(item: any){
    const index = this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.indexOf(item);
    this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.splice(index, 1);
  }

  checkExpiratioDates(event: any){
    if(!this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento || (this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento && this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.length == 0)){ // no hay fechas de vencimiento
      this.productExpirationDate.date = '';
      this.productExpirationDate.quantity = '';
      return;
    }

    let sumExpirationQuantity: number = 0;

    this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.forEach((element: any) => {
      sumExpirationQuantity += element.quantity;
    });

    if(sumExpirationQuantity !== this.orderSelected.detalle[this.productExpirationDate.index].cantidad){
      event.preventDefault();
      Swal.fire({
        icon: 'warning',
        title: 'Productos incompletos',
        text: 'Debes ingresar las fechas de vencimiento del total del producto',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      });

      this.productExpirationDate.date = '';
      this.productExpirationDate.quantity = '';
    }
  }

  sendForm(){
    if(this.orderSelected.detalle.length !== this.productCheck.length){
      Swal.fire({
        icon: 'error',
        title: 'Falló el ingreso',
        text: 'Debes dar VB a todos los productos que ingresan',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      });

      return;
    }

    SwalConfirm.fire({
      icon: 'warning',
      title: 'Confirmar ingreso de stock',
      text: 'Se agregarán los productos al stock correspondiente',
      customClass: {
        confirmButton: 'ml-1 btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      confirmButtonText: 'Confirmar'
    }).then(response => {
      if(!response.value){
        return;
      }

      Toast.fire({
        icon: 'success',
        titleText: 'Productos ingresados'
      });

      //return this._router.navigate(['/admin/inventario']);

    })
  }

}
