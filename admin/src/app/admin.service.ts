import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AdminService {
adminToken:any;
host='http://localhost:3000';
  constructor(private http:Http) { }

loggedIn() {
  return tokenNotExpired();
}
  authenticate(admin) {
    const header = new Headers();
    header.append('content-type', 'application/json');
    return this.http.post(this.host+'/admin/auth_admin', admin,{headers: header}).map(res => res.json());
}
registerUser(obj){
  const header = new Headers();
  header.append('content-type', 'application/json');
  return this.http.post(this.host+'/user/register', obj,{headers: header}).map(res => res.json());
}
getAllUsers(){
  return this.http.get(this.host+'/admin/get_all_users').map(res=>res.json());
}
updateUser(obj){
  const header = new Headers();
  header.append('content-type', 'application/json');
  return this.http.post(this.host+'/user/update_user_det', obj,{headers: header}).map(res => res.json());
}
userById(id){
return this.http.get(this.host+'/user/find_user_by_id/'+id).map(res=>res.json());
}
deleteUser(id){
  return this.http.get(this.host+'/user/delete_user/'+id).map(res=>res.json());
}
postCategory(obj){
  const header = new Headers();
  header.append('content-type', 'application/json');
  return this.http.post(this.host+'/org/post_category', obj,{headers: header}).map(res => res.json());
}

}
