import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ValidateService } from '../validate.service';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService,private route:ActivatedRoute) { }
id;
cat_name;
description;
  ngOnInit() {
    this.route.params.subscribe(i=>{
      this.id=i.id;
    });
    this.adminService.getCategoryById(this.id).subscribe(res=>{
      var r = res.msg;
      this.cat_name=r.cat_name;
      this.description=r.description;
    })
  }
  submit(){
    $('.name').css('border-color','#E8E6E6');
    if(this.validateService.validateInput(this.cat_name)){
      var obj = {
        id:this.id,
        cat_name:this.cat_name,
        description:this.description
      }
      this.adminService.editCategory(obj).subscribe(res=>{
        if(res.success === true){
          $('#message').html('<i class="fa fa-check"></i> Category Edited Successfully')
          .css({"padding":"8px","margin-bottom":"10px","display":"block"});
  
  setTimeout(()=>{
    $('#message').css('display','none')
  },1000);
        }

      })
    }else{
      $('.name').css('border-color','red');  

    }
  }

}
