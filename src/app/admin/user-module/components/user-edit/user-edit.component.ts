import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Toast, SwalConfirm } from 'src/app/shared/util';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userId: number;

  constructor(private _activatedRoute: ActivatedRoute, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.getIdFromParam();
  }

  getIdFromParam(){
    this._activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    })
  }

  update(form: any){
    this._userService.editUser(form.value).subscribe(result => {
      Toast.fire({
        icon: 'success',
        titleText: 'Usuario editado'
      });
      return this._router.navigate(['/admin/usuarios'])
    }, (e) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      })
      console.error(e);
    })
  }

}
