import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.css']
})
export class ProviderCreateComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  create(formValues: any){
    this._userService.createUser(formValues).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Proveedor registrado',
      });
      this._router.navigate(['/admin/proveedores'])
    }, (e) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      })
      console.error(e);
    })
  }

}
