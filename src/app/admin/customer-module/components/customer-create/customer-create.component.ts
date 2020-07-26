import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  create(formValues: any){

    this._userService.createUser(formValues).subscribe(result => {
      Toast.fire({
        icon: 'success',
        titleText: 'Registro correcto'
      });

      return this._router.navigate['/admin/clientes']

    }, (error) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      });
      console.error(error);
    })
  }

}
