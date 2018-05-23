import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ValidateService } from '../services/validate.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { OrgService } from '../services/org.service';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private orgService:OrgService,private http:Http, private userService:UserService,private validateService:ValidateService,private router:Router) { }
location;
lat;
long;
lat2;
long2;
address;
address1;
titl;
selected_i='';
categories;
i_c;
myFiles;
  ngOnInit() {
    console.log(this.distance());
    this.categories=['money','clothes','food'];
  }
  rad(x) {
    return x * Math.PI / 180;
  };
  distance() {
    var lat2 =17.4370593
    var lon2=78.4458482;
    var lat1=17.4468499;
    var lon1=78.39137219999999
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = this.rad(lat2 - lat1);
      var dLong = this.rad(lon2 - lon1);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.rad(lat1) * Math.cos(this.rad(lat2))) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
       return d;
  }
  title(e){
   var t = $(e.target).parent().attr('class');
   
   if(t.includes('home')){
    this.titl = 'home';
    $('div').removeClass('acti');
    $('.home').addClass('acti');
   }else if(t.includes('office')){
    this.titl = 'office';
    $('div').removeClass('acti');
    $('.office').addClass('acti');
   }else if(t.includes('other')){
    this.titl = 'other';
    $('div').removeClass('acti');
    $('.other').addClass('acti');
   }
  }
  geolocate(){
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        console.log(position);
        this.location = position.coords;
        this.lat=position.coords.latitude;
        this.long=position.coords.longitude;
        if (this.location === undefined || this.location === null) {
        } else {
          this.userService.getLocation(this.lat, this.long).subscribe(res => {
            // console.log(res)
            this.address = res.results[0].formatted_address;
            this.address1=(res.results[0].formatted_address).substr(0,34)+'....';
            localStorage.setItem('address',this.address);
          });
        }
      });
    }
  }
  next(){
    $('.n').css('border','none')
    $('.text-box').css('border','1px solid #ddd');
    if(this.address1 !== '' && this.address1 !== null && this.address1 !== undefined){
      if( $('.text-main').children().hasClass('acti')){
        $('.m').css('display','none');
        $('.i_c').css('display','flex');     
      }else{
        $('.text-box').css('border','1px solid red');
      }
    }else{
      $('.n').css('border','1px solid red').css('border-radius','20px')
    }
  }
  next1(){
    if(this.validateService.validateInput(this.selected_i)){
      if(this.categories.includes(this.selected_i.toLowerCase())){
        this.i_c=this.selected_i;
        console.log(this.i_c);
        this.router.navigate(['/categories']);
      }else{
        $('p#se').html('currently,organisations dont have this type of request.')
        .css('margin-top','10px');
        $('.i_s').css('margin-top','-5px');
      }
    }else{
      $('input#selected').css('border-bottom','2px solid red');
    }
  }

}
