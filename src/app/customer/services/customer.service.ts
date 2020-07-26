import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  getPurchasesById(id: number){
    return this._http.get(environment.API_PATH + 'purchases/' + id);
  }

}
