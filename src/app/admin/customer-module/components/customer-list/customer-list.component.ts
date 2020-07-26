import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';
import { firstLetterCapitalize } from 'backend/src/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: any = [];
  currentUser: any = {};

  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getCurrentUser();
  }

  getCustomers(){
    this._userService.getCustomers().subscribe(result => {
      this.customers = result;
    }, (e) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Favor recarga la página'
      })
      console.log(e);

    })
  }

  firstLetterCapitalize(string: string){
    return firstLetterCapitalize(string);
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

}
