import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserType } from 'backend/src/Utilities';

@Injectable({
  providedIn: 'root'
})
export class RedirectByRoleGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this._authService.getToken();
    return this._authService.getCurrentUser(token).toPromise().then((result: any) => {
      const userRole = result.tipoUsuario.id;
      switch(userRole){
        case UserType.Admin || UserType.Empleado || UserType.Vendedor:
          this._router.navigate(['/admin']);
          return true;
          break;
        case UserType.Cliente || UserType.Empresa:
          this._router.navigate(['/clientes']);
          return true;
          break;
        case UserType.Proveedor:
          this._router.navigate(['/proveedores']);
          return true;
          break;
      }
    });
  }

}
