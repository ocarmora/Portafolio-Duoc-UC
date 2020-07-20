import { Component, OnInit } from '@angular/core';
import { SaleService } from './sale-module/services/sale.service';
import { Toast } from '../shared/util';
import { InventoryService } from './inventory-module/services/inventory.service';
import { OrderService } from './order-module/services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  salesStats:any = {};
  crtiticalStock:any = {};
  pendingOrders:any = {};
  salesData:any = {};
  lastSales: any = []
  productsSoldPerMonth: any = {}

  constructor(private _salesService: SaleService, private _inventoryService: InventoryService, private _orderService: OrderService) { }

  ngOnInit(): void {
    this.getSalesStats();
    this.getMonthlySales(2020);
    this.getCriticalStock();
    this.getPendingOrders();
    this.getLastSales(7);
    this.getProductsSoldPerMonth(2020,1);
  }

  getSalesStats(){
    this._salesService.getStats().subscribe(results => {
      this.salesStats = results;
    }, (error) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Favor recarga la página'
      })
      console.log(error)
    })
  }

  getMonthlySales(year: number){
    this._salesService.getSalesByYear(year).subscribe((result:any) => {
      this.salesData = {};
      this.salesData = {
        labels: result.months,
        datasets: [
            {
                label: 'Venta mensual',
                borderColor: '#1E88E5',
                data: result.sales
            }
        ]
      }
    }, (error) => {
      console.error(error);
    })

  }

  getCriticalStock(){
    this._inventoryService.getCriticalStock().subscribe(results => {
      this.crtiticalStock = results;
    }, (error) => {
      console.error(error);
    })
  }

  getPendingOrders(){
    this._orderService.getPendingOrders().subscribe((result: any) => {
      this.pendingOrders = {
        total: result.length,
        detail: result
      }
    }, (error) => {
      console.error(error);
    })
  }

  getLastSales(days: number){
    this._salesService.getLastSales(days).subscribe(result => {
      this.lastSales = [];
      this.lastSales = result;
    }, (error) => {
      console.error(error);
    })
  }

  getProductsSoldPerMonth(year: number, month: number){
    this._salesService.getProductsSoldPerMonth(year,month).subscribe(result => {
      this.productsSoldPerMonth = {};
      this.productsSoldPerMonth = result;
    }, (error) => {
      console.error(error);
    });
  }

}
