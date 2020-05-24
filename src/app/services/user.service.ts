import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.API_PATH + 'users/';

  constructor(private _http: HttpClient) { }

  getOne(id: number){
    return this._http.get(this.apiUrl + id);
  }

}
