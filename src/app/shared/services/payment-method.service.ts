import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../interfaces/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private _http: HttpClient) { }

  getPaymentMethods(){
    return this._http.get<PaymentMethod[]>(environment.API_PATH + 'payment');
  }
}
