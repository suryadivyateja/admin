import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
declare var $:any;
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  constructor(private adminService:AdminService) { }
categories=[];
l;
ur;
  ngOnInit() {
    this.adminService.getAllCategories().subscribe(res=>{
      this.categories = res.msg;
      this.l = res.msg.length;
    })
  }
  delete(u){
    this.ur=u;
    console.log(this.ur);
    $('.back-pop').css({display:'flex'});
  }
  delete_this(){
    var u = this.ur;
    this.adminService.deleteCategory(u._id).subscribe(res=>{
    console.log(res);
    if(res.success === true){
      var index = this.categories.indexOf(u);
      this.categories.splice(index,1);
      $('.back-pop').css({display:'none'});
      $('#message').html('<i class="fa fa-check"></i> Category Deleted Successfully')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
$('#message').css('display','none')
},1000);
    }
    });
  }
  cancel(){
    $('.back-pop').css({display:'none'});

  }


}
