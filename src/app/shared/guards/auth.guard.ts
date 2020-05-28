import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Toast } from '../util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router, private _route: ActivatedRoute){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this._authService.getToken();
    return this._authService.validateToken(token).toPromise().then(result => {
      return true;
    }).catch(error => {
      Toast.fire({
        titleText: 'Debes iniciar sesión',
        icon: 'warning',
      });
      this._authService.clearUserSession();
      this._router.navigate(['/login'], {queryParams: {redirectTo: state.url}});
      return false;
    })
  }

}
