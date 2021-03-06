import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable()
export class UserService {

  constructor(private http:Http,private router:Router) { 
   
  }
  host='http://localhost:3000';
  loggedIn() {
    return tokenNotExpired();
  }
  verify_location(){
    if(localStorage.getItem('lat') && localStorage.getItem('lon')){
    }else {
      this.router.navigate(['/home']);
    }
  }
  getLocation(lat: number, long: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyA87IC9OaLzSxRfYOFjVzXF6ObsDGYFWeQ').map
        ((response) => response.json());
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
postAddress(obj){
  const header = new Headers();
  header.append('content-type', 'application/json');
  return this.http.post(this.host+'/user/post_address', obj,{headers: header})
  .map(res=>res.json());
}


}
