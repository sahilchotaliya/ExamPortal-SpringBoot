import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();


  constructor(private http:HttpClient) { }

  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate Token

  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData)

  }

  //set token in local Services

  public loginUser(token: string) {
    localStorage.setItem('token', token);


    return true;
  }

  //user is login or not

  public isLoggedIn() {

    let tokenStr = localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr==''||tokenStr==null){
      return false;
    } else{
      return true;

    }

  }
  //logout
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token

  public getToken(){
    return localStorage.getItem("token")
  }

  //set USer details

  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
}

public getUser(){
  let userStr = localStorage.getItem("user");
  if(userStr != null){

    return JSON.parse(userStr);

  }else{
    this.logout();
    return null;

  }
}
  //get user role

    public getUSerRole(){
      let user = this.getUser()
      return user.authorities[0].authority;
    }


}
