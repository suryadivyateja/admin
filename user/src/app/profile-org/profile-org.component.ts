import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../services/route.service';
declare var $:any;
@Component({
  selector: 'app-profile-org',
  templateUrl: './profile-org.component.html',
  styleUrls: ['./profile-org.component.css']
})
export class ProfileOrgComponent implements OnInit {
  id;
  constructor(private rse:RouteService, private router:Router,private route:ActivatedRoute) {
    var d = JSON.parse(localStorage.getItem('user'));
   this.id =d.id;
   rse.setId(d.id);
   }
  wrapper='url(http://localhost:3000/image/1526757375966.jpg)';
  wrapper1='http://localhost:3000/image/1526757375966.jpg';
  
  ngOnInit() {
   
  }
  c_click(e){
    var w = $(e.target).parent().attr('class');
    console.log(w);
    console.log(w.includes('c_ic'));
    if(w.includes('c_ic')){
      $('div').removeClass('acti');
      $('.c_ic').addClass('acti');
      this.router.navigate([`/org-profile/info`]);
    }else  if(w.includes('c_ie')){
      $('div').removeClass('acti');
      $('.c_ic1').addClass('acti');
      this.router.navigate([`/org-profile/images`]);
    }else  if(w.includes('c_id')){
      $('div').removeClass('acti');
      $('.c_ic2').addClass('acti');
      this.router.navigate([`/org-profile/videos`]);
    }else  if(w.includes('c_if')){
      $('div').removeClass('acti');
      $('.c_ic3').addClass('acti');
      this.router.navigate([`/org-profile/requirements`]);
    }
  }

}
