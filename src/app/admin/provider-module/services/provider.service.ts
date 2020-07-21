import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private _http: HttpClient) { }

  getDetail(id: number){
    return this._http.get(environment.API_PATH + 'providers/detail/' + id);
  }
}
