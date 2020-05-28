import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../../../shared/interfaces/product';
import { User } from './../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = environment.API_PATH + 'products/';

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get<Product[]>(this.apiUrl);
  }

  getOne(id: number){
    return this._http.get<Product>(this.apiUrl + id);
  }

  getProviders(){
    return this._http.get<User[]>(environment.API_PATH + 'users/providers');
  }

  create(data: any){
    return this._http.post(this.apiUrl, data, {observe: 'response'});
  }

  delete(id: number){
    return this._http.delete(this.apiUrl + id);
  }

  update(data: any){
    return this._http.patch(this.apiUrl + data.id, data);
  }

}
