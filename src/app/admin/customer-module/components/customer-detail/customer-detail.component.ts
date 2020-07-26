import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: any = {
    compras: []
  };

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.getCustomerDetail();
  }

  getCustomerDetail(){
    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(!id){
        return this._router.navigate['404'];
      }
      this._userService.getCustomerDetail(id).subscribe(result => {
        this.customer = result;
      }, (e) => {
        Toast.fire({
          icon: 'error',
          titleText: 'Favor recarga la página'
        })
        console.log(e);
      })
    })
  }

}
