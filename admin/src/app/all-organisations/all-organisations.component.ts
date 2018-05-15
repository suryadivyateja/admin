import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
declare var $:any;
@Component({
  selector: 'app-all-organisations',
  templateUrl: './all-organisations.component.html',
  styleUrls: ['./all-organisations.component.css']
})
export class AllOrganisationsComponent implements OnInit {
ur;
organisations=[];
l;
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getAllOrgs().subscribe(res=>{
      this.organisations=res.msg;
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
    this.adminService.deleteOrg(u._id).subscribe(res=>{
    console.log(res);
    if(res.success === true){
      var index = this.organisations.indexOf(u);
      this.organisations.splice(index,1);
      $('.back-pop').css({display:'none'});
      $('#message').html('<i class="fa fa-check"></i> Organisation Deleted Successfully')
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
