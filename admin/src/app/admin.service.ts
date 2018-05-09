import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AdminService {
adminToken:any;
  constructor(private http:Http) { }
host='http://localhost:3000'
  authenticate(admin) {
    const header = new Headers();
    header.append('content-type', 'application/json');
    return this.http.post(this.host+'/admin/auth_admin', admin,{headers: header}).map(res => res.json());
}
loggedIn() {
  return tokenNotExpired();
}

}
