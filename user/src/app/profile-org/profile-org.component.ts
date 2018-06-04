import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../services/route.service';
import { OrgService } from '../services/org.service';
declare var $:any;
@Component({
  selector: 'app-profile-org',
  templateUrl: './profile-org.component.html',
  styleUrls: ['./profile-org.component.css']
})
export class ProfileOrgComponent implements OnInit {
  id;
  constructor(private orgService:OrgService, private rse:RouteService, private router:Router,private route:ActivatedRoute) {
    var d = JSON.parse(localStorage.getItem('user'));
   this.id =d.id;
   rse.setId(d.id);
   }
  wrapper='url(http://localhost:3000/image/1526757375966.jpg)';
  wrapper1='http://localhost:3000/image/1526757375966.jpg';
  
  ngOnInit() {
    if(this.orgService.loggedIn()){

    }else{
      this.router.navigate(['/home']);
    }
   
  }
  c_click(e){
    var w = $(e.target).attr('class');
    console.log(w);
    // console.log(w.includes('c_ic'));
    if(w.includes('item1') || w.includes('fa-book')){
      this.router.navigate([`/org-profile/info`]);
    }else if(w.includes('item2') || w.includes('fa-image')){
      this.router.navigate([`/org-profile/images`]);
    }else if(w.includes('item3') || w.includes('fa-folder-open')){
      this.router.navigate([`/org-profile/videos`]);
    }else if(w.includes('item4') || w.includes('fa-asterisk')){
      this.router.navigate([`/org-profile/requirements`]);
    }
  }

}
