import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class OrgService {

  constructor(private http:Http) { }
  host='http://localhost:3000';
  loggedIn() {
    return tokenNotExpired();
  }
  registerOrg(obj){
    let header = new Headers();
    header.append('content-type', 'application/json');
    return this.http.post(this.host+'/org/register_org', obj,{headers: header})
    .map(res=>res.json());
  }
  authenticateOrg(obj){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post(this.host+'/org/org_auth',obj,{headers:header})
    .map(res=>res.json());
  }
}
