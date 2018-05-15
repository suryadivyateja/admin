import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ValidateService } from '../validate.service';

declare var $:any;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
cat_name;
description;
picture;

  ngOnInit() {
  }
  key(e){
    if(e.keycode === 13){
      this.submit();
    }
  }
  submit(){

var obj={
  cat_name:this.cat_name,
  description:this.description,
  picture:this.picture
}
$('.name').css('border-color','#E8E6E6');
if(this.validateService.validateInput(this.cat_name)){
  this.adminService.postCategory(obj).subscribe(res=>{
    console.log(res);
    if(res.success === true){
      $('#message').html('<i class="fa fa-check"></i> category added successfully')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
$('#message').css('display','none')
},1000);
       this.cat_name='';
       this.description='';
    }else{
      $('#serr').html('<i class="fa fa-times-circle"></i> category already exists')
    .css({"padding":"8px","margin-bottom":"10px","display":"block"});
    }
    setTimeout(()=>{
      $('#serr').css('display','none')
    },1000);
  })
}else{
  $('.name').css('border-color','red');  
}
   
  }

}
