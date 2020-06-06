import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SwalConfirm } from 'src/app/shared/util';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders = [];

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this._orderService.getOrders().subscribe((result:any) => {
      this.orders = [];
      result.forEach(element => {
        let obj = {
          label: element.activo,
          value: element
        };
        this.orders.push(obj);
      });
    })
  }


}
