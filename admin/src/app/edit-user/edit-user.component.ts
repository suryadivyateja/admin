import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ValidateService } from '../validate.service';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService,private route:ActivatedRoute) { }
id;
name;
email;
phone;
address;
description;
  ngOnInit() {
    this.route.params.subscribe(i=>{
        this.id = i.id;  
    });
    this.adminService.userById(this.id).subscribe(res=>{
      console.log(res);
      var r = res.msg;
      this.name = r.userName;
      this.email = r.email;
      this.phone = r.phone;
      this.address = r.address;
      this.description = r.description;
    })

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
    if(this.validateService.validateInput(this.name) && this.validateService.validateInput(this.email) && this.validateService.validateInput(this.phone)){
      var obj={
        id:this.id,
        userName:this.name,
        email:this.email,
        phone:this.phone,
        address:this.address,
        description:this.description,
      }
      this.adminService.updateUser(obj).subscribe(res=>{
     console.log(res);
       if(res.success === true){
        $('#message').html('<i class="fa fa-check"></i> User Edited Successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#message').css('display','none')
},1000);
      }
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
      
        default:
          break;
      }
    } 
  }

}
