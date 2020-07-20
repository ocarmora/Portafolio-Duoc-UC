import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private _http: HttpClient) { }

  getSales(){
    return this._http.get(environment.API_PATH + 'sales');
  }

  getAll(){
    return this._http.get(environment.API_PATH + 'document/types');
  }

  getCustomerDetail(rut: string){
    return this._http.get(environment.API_PATH + 'customers/' + rut);
  }

  getPaymentMethods(){
    return this._http.get(environment.API_PATH + 'sales/helpers/payment-methods');
  }

  searchProduct(barcode: string){;
    return this._http.get(environment.API_PATH + 'products/barcode/' + barcode);
  }

  sale(data: any){
    return this._http.post(environment.API_PATH + 'sales', data);
  }

  getStats(){
    return this._http.get(environment.API_PATH + 'sales/stats');
  }

  getLastSales(days: number){
    return this._http.get(environment.API_PATH + 'sales/last/' + days);
  }

  getSalesByYear(year: number){
    return this._http.get(environment.API_PATH + 'sales/'+ year +'/stats');
  }

  getProductsSoldPerMonth(year: number, month: number){
    return this._http.get(environment.API_PATH + 'sales/product/'+ year + '/' + month + '/best');
  }

}
