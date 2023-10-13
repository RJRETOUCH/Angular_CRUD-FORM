import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  addUpdateUser(data: any, type: any): Observable<any> {

    if (type == 'Add') {

      return this.http.post(this.url + "Users", data);

    } else {
      return this.http.put(this.url + "Users", data);
    }

  }

  GetAllUsers(): Observable<any> {

    return this.http.get(this.url + "Users")
  }


  DeleteUserbyID(ID: any): Observable<any> {
    return this.http.delete(this.url + "Users/" + ID);
  }

  GetUserbyID(ID: any): Observable<any> {
    return this.http.get(this.url + "Users/" + ID)
  }


}
