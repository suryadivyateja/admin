import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
declare var $:any;
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  constructor(private adminService:AdminService) {

   }
   users=[];
   l;
   ur;
  ngOnInit() {
    this.adminService.getAllUsers().subscribe(res=>{
if(res.success === true){
  this.users = res.msg;
  this.l = res.msg.length;
  console.log(this.users);
}
    })
  }
  delete(u){
    this.ur=u;
    console.log(this.ur);
    $('.back-pop').css({display:'flex'});
  }
  delete_this(){
    var u = this.ur;
    this.adminService.deleteUser(u._id).subscribe(res=>{
    console.log(res);
    if(res.success === true){
      var index = this.users.indexOf(u);
      this.users.splice(index,1);
      $('.back-pop').css({display:'none'});
      $('#message').html('<i class="fa fa-check"></i> User Deleted Successfully')
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
