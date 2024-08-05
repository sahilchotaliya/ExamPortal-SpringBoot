import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient) { }

    login(user: any): Observable<any> {
      return this.http.post(`${baseUrl}/login`, user);
    }

  public addUser(user:any){

    return this.http.post(`${baseUrl}/user/`,user)


  }

}
