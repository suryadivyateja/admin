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
  upload_pro(formData){
    return this.http.post(this.host+'/org/upload_pro',formData).map(res=>res.json());
  }
  createAlbum(obj){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post(this.host+'/org/create_album',obj,{headers:header})
    .map(res=>res.json());
  }
  getAlbumsByOrg_Id(id){
    return this.http.get(this.host+'/org/get_albums_by_org_id/'+ id).map(res=>res.json());
  }
  uploadPicsToAlbum(obj){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post(this.host+'/org/upload_pics_to_album',obj,{headers:header})
    .map(res=>res.json());
  }
  getAlbumsById(id){
    return this.http.get(this.host+'/org/get_albums_by_id/'+ id).map(res=>res.json());
  }
  deletePicsFromAlbum(obj){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post(this.host+'/org/delete_pic_by_id',obj,{headers:header})
    .map(res=>res.json());
  }
}
