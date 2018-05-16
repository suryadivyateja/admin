import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class UserService {

  constructor(private http:Http) { 
   
  }
  host='http://localhost:3000';
  loggedIn() {
    return tokenNotExpired();
  }
  authenticateUser(obj) {
    const header = new Headers();
    header.append('content-type', 'application/json');
    return this.http.post(this.host+'/user/user_auth', obj,{headers: header})
    .map(res=>res.json());
}
registerUser(obj){
  const header = new Headers();
  header.append('content-type', 'application/json');
  return this.http.post(this.host+'/user/register', obj,{headers: header})
  .map(res=>res.json());

}

}
