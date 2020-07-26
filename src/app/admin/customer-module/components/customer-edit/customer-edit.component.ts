import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerId: number;

  constructor(private _activatedRoute: ActivatedRoute, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.getIdParam();
  }

  getIdParam(){
    this._activatedRoute.params.subscribe(params => {
      this.customerId = params['id'];
    })
  }

  update(formValues: any){
    this._userService.editUser(formValues).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Usuario editado'
      });
      return this._router.navigate(['/admin/clientes'])
    }, (e) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      })
      console.error(e);
    })

  }

}
