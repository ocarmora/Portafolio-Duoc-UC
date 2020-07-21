import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  providers: any;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getProviders();
  }


  getProviders(){
    this._userService.getProviders().subscribe(result => {
      this.providers = result;
    }, (error) => {
      Toast.fire({
        icon:'error',
        titleText:'Favor, recarga la página'
      })
      console.error(error)
    });
  }

}
