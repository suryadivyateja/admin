import { Component } from '@angular/core';
import { AdminService } from './services/admin.service';
import { ValidateService } from './services/validate.service';
import { UserService } from './services/user.service';
import { OrgService } from './services/org.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private orgService:OrgService, private userService:UserService, private adminService:AdminService,private validateService:ValidateService){}
  u_s_email;
  u_s_password;
  u_sp_email;
  u_sp_password;
  u_sp_name;
  u_sp_phone;
  u_sp_rp;
  o_s_email;
  o_s_password;
  o_sp_email;
  o_sp_password;
  o_sp_name;
  o_sp_phone;
  o_sp_rp;
  o_sp_address;
  selected_cat='';
  categories=[];
cat_id;
qe=[];
  ngOnInit(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.categories = res.msg;
    })
    $('.back-pop').css('display','none');
    $('.back-pop1').css('display','none');
  }
  open(){
    $('#serr').html('');
    $('#ser').html('');
    $('.back-pop').css('display','flex');
  }
  open1(){
    $('#o_serr').html('');
    $('#o_ser').html('');
    $('.back-pop1').css('display','flex');
  }
  close(){
    $('.back-pop').css('display','none');
  }
  close1(){
    $('.back-pop1').css('display','none');
  }
  signin(){
    this.qe=[];
    $('#serr').html('');
    if(this.validateService.validateInput(this.u_s_email) && this.validateService.validateInput(this.u_s_password)){
      var obj = {
        email:this.u_s_email,
        password:this.u_s_password
      }
      this.userService.authenticateUser(obj).subscribe(res=>{
        console.log(res);
      if(res.success === false){
        $('#serr').html(res.msg).css('margin-top','-10px').css('margin-bottom','5px');
      }
      else {
        localStorage.setItem('token',res.token);
        localStorage.setItem('user',JSON.stringify(res.msg));
        this.qe.push(res.msg.userName);
        console.log(this.qe);
        $('.back-pop').css('display','none');
        $('.right-navi').css('display','none');
        $('.right-navi.rig').css('display','flex').css('left','-91px');
      }
      })
    }else{
      switch (false) {
        case this.validateService.validateInput(this.u_s_email):
        $('#serr').html('please enter your email address').css('margin-top','-10px')
        .css('margin-bottom','5px');
          break;
          case this.validateService.validateInput(this.u_s_password):
          $('#serr').html('please enter the password').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
      
        default:
          break;
      }
    }
  }
  signup(){
    this.qe=[];
    $('#ser').html('');
    if(this.validateService.validateInput(this.u_sp_name) && this.validateService.validateInput(this.u_sp_email) && this.validateService.validateInput(this.u_sp_phone) && this.validateService.validateInput(this.u_sp_password) && this.validateService.validateInput(this.u_sp_rp)){
      if(this.u_sp_password === this.u_sp_rp){
      var obj = {
        userName:this.u_sp_name,
        email:this.u_sp_email,
        phone:this.u_sp_phone,
        password:this.u_sp_rp,

      }
      this.userService.registerUser(obj).subscribe(res=>{
        console.log(res);
      if(res.success === false){
        $('#ser').html(res.msg).css('margin-top','2%');
      }
      else if(res.success === true){
        localStorage.setItem('token',res.token);
        localStorage.setItem('user',JSON.stringify(res.msg));
        this.qe.push(res.msg.userName);
        console.log(this.qe);
        $('.back-pop').css('display','none');
        $('.right-navi').css('display','none');
        $('.right-navi.rig').css('display','flex').css('left','-91px');  
      }
      });
    }else{
      $('#ser').html('passwords do not match').css('margin-top','2%');
    }
    }else{
      switch (false) {
        case this.validateService.validateInput(this.u_sp_name):
        $('#ser').html('please enter your name').css('margin-top','2%')
          break;
          case this.validateService.validateInput(this.u_sp_email):
          $('#ser').html('please enter your email address').css('margin-top','2%')
            break;
        case this.validateService.validateInput(this.u_sp_phone):
        $('#ser').html('please enter your phone number').css('margin-top','2%')
          break;
          case this.validateService.validateInput(this.u_sp_password):
          $('#ser').html('please enter the password').css('margin-top','2%')
            break;
            case this.validateService.validateInput(this.u_sp_rp):
          $('#ser').html('please re-enter the password').css('margin-top','2%')
            break;
      
        default:
          break;
      }
    }
  }
  o_signin(){
    this.qe=[];
    $('o_#serr').html('');
    if(this.validateService.validateInput(this.o_s_email) && this.validateService.validateInput(this.o_s_password)){
      var obj = {
        email:this.o_s_email,
        password:this.o_s_password
      }
      this.orgService.authenticateOrg(obj).subscribe(res=>{
        console.log(res);
      if(res.success === false){
        $('#o_serr').html(res.msg).css('margin-top','-10px').css('margin-bottom','5px');
      }
      else {
        localStorage.setItem('token',res.token);
        localStorage.setItem('org',JSON.stringify(res.msg));
        this.qe.push(res.msg.name);
        console.log(this.qe);
        $('.back-pop1').css('display','none');
        $('.right-navi').css('display','none');
        $('.right-navi.rig').css('display','flex').css('left','-91px');  
      }
      })
    }else{
      switch (false) {
        case this.validateService.validateInput(this.o_s_email):
        $('#o_serr').html('please enter your email address').css('margin-top','-10px')
        .css('margin-bottom','5px');
          break;
          case this.validateService.validateInput(this.o_s_password):
          $('#o_serr').html('please enter the password').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
      
        default:
          break;
      }
    }
  }
  o_signup(){
    this.qe=[];
    this.cat_id='';
    $('#o_ser').html('');
       
    if(this.validateService.validateInput(this.o_sp_name) && this.validateService.validateInput(this.o_sp_email) && this.validateService.validateInput(this.o_sp_phone) && this.validateService.validateInput(this.o_sp_password) && this.validateService.validateInput(this.o_sp_rp) && this.validateService.validateInput(this.o_sp_address) && this.validateService.validateInput(this.selected_cat)){
      if(this.o_sp_password === this.o_sp_rp){  
        this.adminService.getCatByName(this.selected_cat).subscribe(r=>{
          this.cat_id=r.msg._id 
      var obj = {
        name:this.o_sp_name,
        email:this.o_sp_email,
        phone:this.o_sp_phone,
        password:this.o_sp_rp,
        address:this.o_sp_address,
        category_id:this.cat_id
      }
      this.orgService.registerOrg(obj).subscribe(res=>{
        console.log(res);
      if(res.success === false){
        $('#o_ser').html(res.msg).css('margin-top','-10px').css('margin-bottom','5px');
      }
      else if(res.success === true){
        localStorage.setItem('token',res.token);
        localStorage.setItem('org',JSON.stringify(res.msg));
        this.qe.push(res.msg.name);
        console.log(this.qe);
        $('.back-pop1').css('display','none');
        $('.right-navi').css('display','none');
        $('.right-navi.rig').css('display','flex').css('left','-91px');    
      }
      });
    });
    
    }else{
      $('#o_ser').html('passwords do not match').css('margin-top','-10px').css('margin-bottom','5px');
    }
    }else{
      switch (false) {
        case this.validateService.validateInput(this.o_sp_name):
        $('#o_ser').html('please enter your name').css('margin-top','-10px')
        .css('margin-bottom','5px');
          break;
          case this.validateService.validateInput(this.o_sp_email):
          $('#o_ser').html('please enter your email address').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
        case this.validateService.validateInput(this.o_sp_phone):
        $('#o_ser').html('please enter your phone number').css('margin-top','-10px')
        .css('margin-bottom','5px');
          break;
          case this.validateService.validateInput(this.o_sp_password):
          $('#o_ser').html('please enter the password').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
            case this.validateService.validateInput(this.o_sp_rp):
          $('#o_ser').html('please re-enter the password').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
            case this.validateService.validateInput(this.o_sp_address):
          $('#o_ser').html('please re-enter the address').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
            case this.validateService.validateInput(this.selected_cat):
          $('#o_ser').html('please select a category').css('margin-top','-10px')
          .css('margin-bottom','5px');
            break;
      
        default:
          break;
      }
    }
  
  }

}
