import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;

  constructor(private _usersService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._usersService.getUsers().subscribe(result => {
      this.users = result;
    }, (error) => {
      Toast.fire({
        icon:'error',
        titleText:'Favor, recarga la página'
      })
      console.error(error)
    });
  }

}
