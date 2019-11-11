import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './Model/Employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiIndex : string="https://5db9339b177b350014ac8138.mockapi.io/Employee";
  apiCreate : string="https://5db9339b177b350014ac8138.mockapi.io/Employee";
  apiUpdate:string="https://5db9339b177b350014ac8138.mockapi.io/Employee/"

  constructor(private _http:HttpClient) { }

  getAPI():Observable<any>{
    return this._http.get(this.apiIndex);
  }

  createAPI(create){
    return this._http.post<Employee>(this.apiCreate,create)
  }

  updateAPI(id:any,body:any){
    return this._http.put<Employee>(`${this.apiUpdate}${id}`,body);
  }

  detailAPI(id:number){
    return this._http.get<Employee>(`${this.apiUpdate}${id}`);
  }

  deleteAPI(id:number){
    return this._http.delete<Employee>(`${this.apiIndex}/${id}`)
  }
}

