import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService) { }
location;
lat;
long;
address;
  ngOnInit() {
  }
  geolocate(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        this.location = position.coords;
        this.lat=position.coords.latitude;
        this.long=position.coords.longitude;
        if (this.location === undefined || this.location === null) {
        } else {
          this.userService.getLocation(this.lat, this.long).subscribe(res => {
            this.address = res.results[0].formatted_address;
            localStorage.setItem('address',this.address);
          });
        }
      });
    }

  }

}
