import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer-module',
  templateUrl: './customer-module.component.html',
  styleUrls: ['./customer-module.component.css']
})
export class CustomerModuleComponent implements OnInit {

  currentUser: any = {};
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

}
