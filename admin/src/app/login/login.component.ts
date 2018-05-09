import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { AdminService } from "../admin.service";
import { Router } from '@angular/router';
import { ValidateService } from '../validate.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private title:Title,private validateService:ValidateService, private adminService:AdminService) {
    title.setTitle('login | Admin');
   }
   email;
   password;

  ngOnInit() {
    $('.main-page').css('left','0');
    $('.main-page').css('width','100vw');
    $('#main').css('display','none');  
  }
  onenter(e){
    if(e.keyCode === 13){
      this.continue();
    }else{
      $('#errors').html('');
    }
  }
continue(){
  if(this.validateService.validateInput(this.email) && this.validateService.validateInput(this.password)){
    var obj={
      email:this.email,
      password:this.password
    }
      this.adminService.authenticate(obj).subscribe(res=>{
        console.log(res);
        if(res.success === true){
          console.log(res.token);
        localStorage.setItem('token',res.token);
          this.router.navigate(['/home']);
        }else if(res.success === false){
          $('#errors').html('please check email and password');
        }
      })
  }else{
    switch (false) {
      case this.validateService.validateInput(this.email):
      $('#errors').html('Enter your Email Address')
        break;
        case this.validateService.validateInput(this.password):
      $('#errors').html('Enter your Password')
        break;
    
      default:
        break;
    }
  }
  
}
}