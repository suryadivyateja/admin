import { Component, OnInit } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { OrgService } from '../../services/org.service';
declare var $:any;
@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {

  constructor(private orgService:OrgService) { }
u_re;
u_r;
arr3=[];
_id;
u
  ngOnInit() {
  this.u = JSON.parse(localStorage.getItem('user'));
  this._id = this.u.id;
  this.orgService.getOrgById(this._id).subscribe(res=>{
    console.log(res);
    this.u_r = res.msg.em_req;
  })
  }
selected(e){
  this.u_re='';
  this.u_re=e.target.outerText;
}
u_sub(){
  $('#errors').html('');
  if(this.u_re !== undefined){
    var obj ={
      _id:this._id,
      em_req:this.u_re
    }
    this.orgService.emReq(obj).subscribe(res=>{
      if(res.success === true){
        this.u_r = this.u_re;
      }
    })
  }else{
    $('#errors').html('please select a category')
  }
}

}
