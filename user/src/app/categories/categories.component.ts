import { Component, OnInit } from '@angular/core';
import { OrgService } from '../services/org.service';
import { AdminService } from '../services/admin.service';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
arr1=[];
  constructor(private userService:UserService, private router:Router, private appComponent:AppComponent, private orgService:OrgService,private adminService:AdminService) { }
lat1;
lon1;
arr2=[];
  ngOnInit() {
    this.userService.verify_location();
      this.lat1 = JSON.parse(localStorage.getItem('lat'));
    this.lon1 = JSON.parse(localStorage.getItem('lon'));
    this.adminService.getAllOrgs().subscribe(res=>{
      res.msg.forEach(element => {
        var w =this.cal(this.lat1,this.lon1,element.lat,element.lon);
        console.log(w);
        if(w <= 6500){
          this.arr2.push(element);
          console.log(this.arr2);
        }
      });
    });
  }
  rad(x) {
    return x * Math.PI / 180;
  };
  cal(lat1,lon1,lat2,lon2){
    var R = 6378137;
    var dLat = this.rad(lat2 - lat1);
    var dLong = this.rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(lat1) * Math.cos(this.rad(lat2))) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
     return d;
  }

}
