import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProviderService } from 'src/app/provider/services/provider.service';
import { firstLetterCapitalize } from 'backend/src/Utilities';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private _authService: AuthService, private _providerService: ProviderService) { }

  orders = [];
  orderDetail: any = {};

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: any) => {
      this._providerService.getOrdersByProvider(result.id).subscribe((response: any) => {
        this.orders = response;
      });
    });
  }

  detail(index: number){
    this.orderDetail = this.orders[index];
  }

  flc(str: string){
    return firstLetterCapitalize(str);
  }

}
