import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserRoles(){
    return this._http.get(environment.API_PATH + 'users/roles');
  }

  createUser(userData: any){
    return this._http.post(environment.API_PATH + 'users', userData);
  }

  getUsers(){
    return this._http.get(environment.API_PATH + 'users');
  }

  getUser(id: number){
    return this._http.get(environment.API_PATH + 'users/' + id);
  }

  editUser(data: any){
    return this._http.post(environment.API_PATH + 'users/' + data.id, data);
  }

  delete(userId: number){
    return this._http.delete(environment.API_PATH + 'users/' + userId);
  }

  getProviders(){
    return this._http.get(environment.API_PATH + 'users/providers');
  }

  getCustomers(){
    return this._http.get(environment.API_PATH + 'users/customers');
  }

  getCustomerDetail(id: number){
    return this._http.get(environment.API_PATH + 'users/customers/detail/' + id);
  }

}
