import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ValidateService } from '../validate.service';
declare var $:any;
@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
categories=[];
name;
email;
phone;
password;
selected_cat;
address;
cat_id;
  ngOnInit() {
    this.adminService.getAllCategories().subscribe(res=>{
      this.categories = res.msg;
    });

  }
  key(e){
    if(e.keycode === 13){
      this.submit();
    }
  }
  submit(){
    this.adminService.getCatByName(this.selected_cat).subscribe(res=>{
      this.cat_id=res.msg._id;
      console.log(this.cat_id);
   
    $('.name').css('border-color','#E8E6E6');
    $('.email').css('border-color','#E8E6E6');
    $('.phone').css('border-color','#E8E6E6');  
    $('.pass').css('border-color','#E8E6E6');
    $('.cat').css('border-color','#E8E6E6');

    if(this.validateService.validateInput(this.name) && this.validateService.validateInput(this.email) && this.validateService.validateInput(this.phone) && this.validateService.validateInput(this.password) && this.validateService.validateInput(this.selected_cat) && this.validateService.validateInput(this.address)){
  
      var obj={
        name:this.name,
        email:this.email,
        phone:this.phone,
        password:this.password,
        address:this.address,
        category_id:this.cat_id,
      }
      this.adminService.registerOrg(obj).subscribe(res=>{
        console.log(res);
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
          this.selected_cat='';
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
                case this.validateService.validateInput(this.address):
                $('.address').css('border-color','red');  
                  break;
                  case this.validateService.validateInput(this.selected_cat):
                  $('.cat').css('border-color','red');  
                    break;
      
        default:
          break;
      }
    } 
  })
  }

}
