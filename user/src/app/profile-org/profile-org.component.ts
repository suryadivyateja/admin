import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-profile-org',
  templateUrl: './profile-org.component.html',
  styleUrls: ['./profile-org.component.css']
})
export class ProfileOrgComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }
  wrapper='url(http://localhost:3000/image/1526757375966.jpg)';
  wrapper1='http://localhost:3000/image/1526757375966.jpg';
  id;
  ngOnInit() {
    this.route.params.subscribe(d=>{
      this.id=d.id;
    })

  }
  c_click(e){
    var w = $(e.target).parent().attr('class');
    console.log(w);
    console.log(w.includes('c_ic'));
    if(w.includes('c_ic')){
      $('div').removeClass('acti');
      $('.c_ic').addClass('acti');
      this.router.navigate([`/org-profile/${this.id}/info`]);
    }else  if(w.includes('c_ie')){
      $('div').removeClass('acti');
      $('.c_ic1').addClass('acti');
      this.router.navigate([`/org-profile/${this.id}/images`]);
    }else  if(w.includes('c_id')){
      $('div').removeClass('acti');
      $('.c_ic2').addClass('acti');
      this.router.navigate([`/org-profile/${this.id}/videos`]);
    }else  if(w.includes('c_if')){
      $('div').removeClass('acti');
      $('.c_ic3').addClass('acti');
      this.router.navigate([`/org-profile/${this.id}/requirements`]);
    }
  }

}
