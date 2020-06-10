import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any = [];

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this._orderService.getOrders().subscribe((result:any) => {
      this.orders = [];
      result.forEach((element: any) => {

        let total: number = 0;

        element.detalle.forEach(product => {
          let subtotal = product.cantidad * product.precioCompra;
          total += subtotal;
        });

        let obj = {
          label: element.activo,
          value: element,
          total: total
        };

        this.orders.push(obj);
      });
    })
  }


}
