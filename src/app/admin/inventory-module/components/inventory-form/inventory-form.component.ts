import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/admin/order-module/services/order.service';
import { Order } from 'src/app/shared/interfaces/order';
import { SelectItem } from 'primeng/api/selectitem';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  productExpirationDate: any = {
    index: 0,
    quantity: '',
    date: '',
  };

  constructor(private _orderService: OrderService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.getOpenOrders();
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
    let obj = {
      quantity: this.productExpirationDate.quantity,
      date: this.productExpirationDate.date,
    }

    let detalleFechasVencimiento = this.expirationDates;

    if(obj.quantity > this.orderSelected.detalle[this.productExpirationDate.index].cantidad){
      Swal.fire({
        icon: 'error',
        title: 'Cantidad incorrecta',
        text: 'La cantidad ingresada no puede ser mayor a la cantidad total del producto de la orden de compra',
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
            icon: 'error',
            title: 'Cantidad incorrecta',
            text: 'La cantidad ingresada no puede ser mayor a la cantidad total del producto de la orden de compra',
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
          this.orderSelected.detalle[this.productExpirationDate.index].detalleFechasVencimiento.push(obj)
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
