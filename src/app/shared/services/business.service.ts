import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private _http: HttpClient) { }

  getInfo(){
    return this._http.get(environment.API_PATH + 'business/detail');
  }

}
