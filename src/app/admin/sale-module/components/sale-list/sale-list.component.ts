import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  sales: any = [];

  constructor(private _salesService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this._salesService.getSales().subscribe(result => {
      this.sales = result;
    }, (error) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Favor recarga la página'
      });
      console.error(error);
    });
  }

}
