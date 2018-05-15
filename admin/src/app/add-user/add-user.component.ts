import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ValidateService } from '../validate.service';
declare var $:any
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
name;
email;
phone;
address;
description;
password;

  ngOnInit() {
  
  }
  key(e){
    if(e.keycode === 13){
      this.submit();
    }
  }
  submit(){
    $('.name').css('border-color','#E8E6E6');
    $('.email').css('border-color','#E8E6E6');
    $('.phone').css('border-color','#E8E6E6');  
    $('.pass').css('border-color','#E8E6E6'); 
    if(this.validateService.validateInput(this.name) && this.validateService.validateInput(this.email) && this.validateService.validateInput(this.phone) && this.validateService.validateInput(this.password)){
  
      var obj={
        userName:this.name,
        email:this.email,
        phone:this.phone,
        password:this.password,
        address:this.address
      }
      this.adminService.registerUser(obj).subscribe(res=>{
      //   if(res.success === true){
      //     this.address='';
      //     this.email='';
      //     this.name='';
      //     this.phone='';
      //     this.description='';
      //     this.password='';
      //     setInterval(() => {
      //       $('.alert-success').css('display','block').html('successfully added user');  
      //     }, 2000); 
      //   }
      // });
       if(res.success === true){
        $('#message').html('<i class="fa fa-check"></i> user added successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#message').css('display','none')
},1000);
          this.address='';
          this.email='';
          this.name='';
          this.phone='';
          this.description='';
          this.password='';
      }else{
        console.log('ehbhbh');
        $('#serr').html('<i class="fa fa-times-circle"></i> user already exists')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
      }
      setTimeout(()=>{
        $('#serr').css('display','none')
      },1000);
    })
    }else{
      switch (false) {
        case this.validateService.validateInput(this.name):
        $('.name').css('border-color','red');  
          break;
          case this.validateService.validateInput(this.email):
          $('.email').css('border-color','red');  
            break;
            case this.validateService.validateInput(this.phone):
            $('.phone').css('border-color','red');  
              break;
              case this.validateService.validateInput(this.password):
              $('.pass').css('border-color','red');  
                break;
      
        default:
          break;
      }
    } 
  }
}
