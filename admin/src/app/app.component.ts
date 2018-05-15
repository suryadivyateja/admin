import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  categories = ['account', 'settings', 'logout', 'aqw'];
  searchText;
  results = [];

  ngOnInit() {
    $('.bars').click(function () {
      if ($('.main-div').hasClass('col-lg-8')) {
          $('.sidebar').removeClass('col-lg-4').css({'display': 'none'});
          $('.main-div').removeClass('col-lg-8').addClass('col-lg-12');
      } else if ($('.main-div').hasClass('col-lg-12')) {
          $('.sidebar').css({'display':'block'}).addClass('col-lg-4');
          $('.main-div').removeClass('col-lg-12').addClass('col-lg-8');
          
          
      }
  });
  $('.anc').click(function(){
      // $('.anc').css('background-color','#162439');
      $('ul.collapse').css('margin-top','10px').css('width','250px').css('margin-left','-10px').css('padding-left','80px').css('font-size','12px').css('padding-top','10px').css('padding-bottom','5px');
      $('ul.collapse li').css({
          marginBottom:'10px'
      })
  })
  }
}
