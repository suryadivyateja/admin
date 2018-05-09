import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private title:Title) { 
    this.title.setTitle('home | admin');
  }

  ngOnInit() {
    $('.main-page').css('left','19vw');
    $('.main-page').css('width','81vw');
    $('#main').css('display','flex');  
    
  }

}
