import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any = {
    detalle: {}
  };

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

  logout(): void{
    this._authService.clearUserSession();
    this._router.navigate(['/login']).then(result => {
      Toast.fire({
        titleText: 'Sesión finalizada',
        icon: 'info'
      })
    });
  }

}
