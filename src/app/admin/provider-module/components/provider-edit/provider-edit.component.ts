import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css']
})
export class ProviderEditComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  update(formValues: any){
    this._userService.editUser(formValues).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Usuario editado'
      });
      return this._router.navigate(['/admin/proveedores'])
    }, (e) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      })
      console.error(e);
    })
  }

}
