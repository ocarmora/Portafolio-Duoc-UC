import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthInterface } from './../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_PATH;

  constructor(private _http: HttpClient) { }

  validateToken(token: string){
    return this._http.post('http://localhost:3000/api/auth/validate', {token});
  }

  login(userData: AuthInterface){
    return this._http.post(this.apiUrl + 'auth/login', userData);
  }

  setToken(token: string): void{
    sessionStorage.setItem('token', token);
  }

  getToken(): string{
    return sessionStorage.getItem('token');
  }

  clearUserSession(): void{
    sessionStorage.removeItem('token');
  }

  getCurrentUser(token: string){
    return this._http.post( this.apiUrl + 'auth/current', {token: token});
  }

}
