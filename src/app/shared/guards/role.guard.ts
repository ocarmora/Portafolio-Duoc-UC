import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let roles = next.data.roles as Array<number>;

    const token = this.authService.getToken();
    const user: any = await this.authService.getCurrentUser(token).toPromise().then(user => user);
    let response = false;

    if(roles){
      roles.forEach(rol => {
        if(rol == user.tipoUsuario.id){
          response = true;
        }
      });
    }

    if(response){
      return true;
    }else{
      this.router.navigate(['403']);
      return false;
    }
  }

}
