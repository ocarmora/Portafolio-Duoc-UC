import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private _usersService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  create(form: any){

    this._usersService.createUser(form.value).subscribe(result => {
      Toast.fire({
        icon: 'success',
        titleText: 'Registro correcto'
      });

      return this._router.navigate(['/admin/usuarios'])

    }, (error) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      });
      console.error(error);
    })

  }

}
