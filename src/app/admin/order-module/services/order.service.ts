import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getProviders(){
    return this._http.get(environment.API_PATH + 'users/providers');
  }

  getOpenOrders(){
    return this._http.get(environment.API_PATH + 'orders/open');
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

  cancel(data: any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this._http.delete(environment.API_PATH + 'orders', options);
  }

  getPendingOrders(){
    return this._http.get(environment.API_PATH + 'orders/pending');
  }

}
