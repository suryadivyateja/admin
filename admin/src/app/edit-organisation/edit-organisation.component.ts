import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../validate.service';
declare var $:any;
@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.css']
})
export class EditOrganisationComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService,private route:ActivatedRoute) { }
id;
name;
email;
phone;
address;
selected_cat;
categories=[];
cat_id;
  ngOnInit() {
    this.route.params.subscribe(i=>{
      this.id=i.id;
    });
    this.adminService.getAllCategories().subscribe(res=>{
      this.categories = res.msg;
      console.log(this.categories);
    })
    this.adminService.getOrgById(this.id).subscribe(res=>{
      console.log(res);
      var r = res.msg;
      this.name = r.name;
      this.email = r.email;
      this.phone = r.phone;
      this.address = r.address;
        this.selected_cat = r.category[0].cat_name;
      });
  }
  submit(){
    this.adminService.getCatByName(this.selected_cat).subscribe(r=>{
      this.cat_id = r.msg._id;
      console.log(this.cat_id);
    
    $('.name').css('border-color','#E8E6E6');
    $('.email').css('border-color','#E8E6E6');
    $('.phone').css('border-color','#E8E6E6');
    $('.address').css('border-color','#E8E6E6');
    $('.cat').css('border-color','#E8E6E6');
console.log(this.selected_cat);
    if(this.validateService.validateInput(this.name) && this.validateService.validateInput(this.email) && this.validateService.validateInput(this.phone) && this.validateService.validateInput(this.address) && this.validateService.validateInput(this.selected_cat)){ 
      var obj = {
        id:this.id,
        name:this.name,
        email:this.email,
        phone:this.phone,
        address:this.address,
        category_id:this.cat_id
      }
      this.adminService.editOrg(obj).subscribe(res=>{
        if(res.success === true){
          $('#message').html('<i class="fa fa-check"></i> Organisation Edited Successfully')
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
              case this.validateService.validateInput(this.phone):
              $('.address').css('border-color','red');  
                break;
                case this.validateService.validateInput(this.phone):
                $('.cat').css('border-color','red');  
                  break;
      
        default:
          break;
      }
    }
  });

  }

}
