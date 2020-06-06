import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getProviders(){
    return this._http.get(environment.API_PATH + 'users/providers');
  }

  getOrders(){
    return this._http.get(environment.API_PATH + 'orders');
  }

  getOrderDetail(id: number){
    return this._http.get(environment.API_PATH + 'orders/' + id);
  }

  getProductsFromProvider(id: number){
    return this._http.get(environment.API_PATH + 'products/provider/' + id);
  }

  create(data: any){
    return this._http.post(environment.API_PATH + 'orders', data);
  }

  cancel(id: number){
    return this._http.delete(environment.API_PATH + 'orders/' + id);
  }

}
