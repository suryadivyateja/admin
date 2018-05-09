import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from "./admin.service";
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private adminService:AdminService){}
  canActivate() {
    if(this.adminService.loggedIn() === true){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
