import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private _http: HttpClient) { }

  getOrdersByProvider(id: number){
    return this._http.get(environment.API_PATH + 'providers/' + id + '/orders');
  }

}
