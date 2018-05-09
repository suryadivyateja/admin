import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router) { }
  categories=['account','settings','logout','aqw'];
  searchText;
  results=[];

  ngOnInit() {
    $('.r').css('display','none');
    $('.q').click(function(){
      if($('.side-nav').offset().left === 0){
        if($('.i i').hasClass('fas fa-list')){
          $('.i i').removeClass('fas fa-list').addClass('fa fa-align-justify');
        }else{
          $('.i i').removeClass('fa fa-align-justify').addClass('fas fa-list');
        }
        $('.side-nav').animate({'left':'-19vw'},400);
        $('.main-page').animate({'left':'0','width':'100vw'},400);

      }else{
        if($('.i i').hasClass('fas fa-list')){
          $('.i i').removeClass('fas fa-list').addClass('fa fa-align-justify');
        }else{
          $('.i i').removeClass('fa fa-align-justify').addClass('fas fa-list');
        }
        $('.side-nav').animate({'left':'0'},400);
        $('.main-page').animate({'left':'19vw','width':'81vw'},400);
      }
     })
     $('.a').click(function(){
       if($('.fa').hasClass('fa-caret-down')){
         $('.fa').removeClass('fa-caret-down').addClass('fa-caret-up');
      }else{
        $('.fa').removeClass('fa-caret-up').addClass('fa-caret-down');

       }
       $('.drop').css('margin-top','0').slideToggle();
       $('.drop').css('display','flex');
     })
  }
  search(event){
    if(event.keyCode === 13){
      this.searchThis();
    }
  }
  searchThis(){
    this.results=[];
    if(this.searchText !== undefined && this.searchText !== ''){
    this.results=this.categories.filter((element)=>{
      return (element.toLowerCase().includes(this.searchText.toLowerCase())) 
    })
    if(this.results.length === 0){
      this.results.push(`no results found for ${this.searchText}`)
    }
      $('.r').css('display','flex').delay('5000').slideToggle();
  }else{
    this.results.push('please enter a keyword');
    $('.r').css('display','flex').delay('5000').slideToggle();


  }
  

    console.log(this.results); 
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}