import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  apiUrl: string = environment.API_PATH + 'products/categories/';

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get(this.apiUrl);
  }

  getOne(id: number){
    return this._http.get(this.apiUrl + id);
  }

  update(data: any){
    return this._http.patch(this.apiUrl + data.id, data);
  }

  create(data: any){
    return this._http.post(this.apiUrl, data, { observe: 'response' });
  }

  delete(id: number){
    return this._http.delete(this.apiUrl + id);
  }

}
