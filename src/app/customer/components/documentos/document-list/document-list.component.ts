import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { firstLetterCapitalize } from 'backend/src/Utilities';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  purchases: any = [];
  purchaseDetail: any = {};

  constructor(private _authService: AuthService, private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.getUserPurchases();
  }

  getUserPurchases(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: any) => {
      this._customerService.getPurchasesById(result.id).subscribe((response: any) => {
        this.purchases = response;
      });
    });
  }

  detail(index: number){
    this.purchaseDetail = this.purchases[0];
  }


  flc(str: string){
    return firstLetterCapitalize(str);
  }
}
