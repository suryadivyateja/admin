import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileOrgComponent } from '../profile-org.component';
import * as viewer from 'viewerjs';
declare var $:any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private p:ProfileOrgComponent, private orgService:OrgService,private route:ActivatedRoute) { 
  }
image_list=[];
url;
p_images=[];
g_id;
d_images=[];
p_b;
z_i='';
  ngOnInit() {
    $('.d_i_z').css('display','none');
    $('.p_d_b').css('display','none');
    $('.u_i').css('display','none');
    $('a.u').click(function(){
      $('.u_i').trigger('click');
    });
    this.route.params.subscribe(g=>{
      this.g_id=g.id;
    })
    this.orgService.getAlbumsById(this.g_id).subscribe(res=>{
      this.d_images=res.msg.images;
    })
  }
  upload_i(e){
    this.p_images=[];
    this.image_list=[];
    for(var i=0;i<e.target.files.length;i++){
      this.image_list.push(e.target.files[i]);
    }
   var allowedFileTypes = ["image/jpeg", "image/jpg"];
   for(var i=0;i<this.image_list.length;i++){
     if(allowedFileTypes.indexOf(this.image_list[i].type) > -1){
      var reader = new FileReader();
      reader.onload = (e:any) => {
        this.p_images.push(e.target.result);
        $('.p_i').css('display','flex');
      }
      reader.readAsDataURL(this.image_list[i]);
     }else{

     }
   } 
  }
   cancel_p_i(){
     this.p_images =[];
     $('.p_i').css('display','none');
   }
  upload(){
    var fd = new FormData();
    for(var i=0; i<=this.image_list.length;i++){
      fd.append('pics[]',this.image_list[i]);
    }
    this.orgService.upload_pro(fd).subscribe(res=>{
      var obj = {
        id:this.g_id,
        org_id:this.p.id,
        pics:res.msg
      }
      this.orgService.uploadPicsToAlbum(obj).subscribe(re=>{
        if(re.success === true){
          $('.p_i').css('display','none');
          res.msg.forEach(element => {
            this.d_images.push(element);
          });   
        }
      })

    })
  }
  preview(d,e){
    // console.log(e.target);
    var w = $(e.target).attr('class');
    console.log(w);
    $('img').removeClass('b_image');
    $(w).addClass('b_image');
    $('.d_i_z').addClass('n_b');
    this.p_b='';
    if(w.hasClass){
      $('.p_d_b').css('display','flex');  
      this.p_b=d;
      // console.log(this.p_b);
    }
  }
  d_g_b(e){
    this.z_i='';
    var t = $(e.target).attr('class');
    if(t.includes('fa fa-info-circle')){

    }else if(t.includes('fa fa-eye')){
     this.z_i = this.p_b.image;
      $('.d_i_z').css('display','flex');

    }else if(t.includes('fa fa-trash')){
      var obj = {
        org_id:this.p.id,
        id:this.g_id,
        p_id:this.p_b.id
      }
      this.orgService.deletePicsFromAlbum(obj).subscribe(res=>{
        if(res.success === true){
          var index = this.d_images.indexOf(this.p_b);
          this.d_images.splice(index,1);
        }
      })
    }
  }
  close_zi(){
    $('.d_i_z').css('display','none');
  }

}
