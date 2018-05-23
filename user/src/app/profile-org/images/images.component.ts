import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { OrgService } from '../../services/org.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileOrgComponent } from "../profile-org.component";
declare var $: any;
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  f_name = '';
  button_status = false;
  folders = [];
  o_id;
  albums = [];
  a_names = [];
  constructor( private p: ProfileOrgComponent, private route: ActivatedRoute, private orgService: OrgService, private validateService: ValidateService) {
  }

  ngOnInit() {
    this.orgService.getAlbumsByOrg_Id(this.p.id).subscribe(res => {
      this.folders = res.msg;
      res.msg.forEach(element => {
        this.a_names.push(element.name);
      });
    });
    $('.pop').css('display', 'none');
  }
  open_cf() {
    $('.pop').css('display', 'flex');
  }
  close_cf() {
    $('.pop').css('display', 'none');
  }
  keypre(e) {
    if (e.target.value) {
      this.button_status = true;
    } else {
      this.button_status = false;
    }
  }
  create_cf() {
    if (this.a_names.indexOf(this.f_name) < 0) {
      var obj = {
        org_id: this.p.id,
        name: this.f_name
      }
      this.orgService.createAlbum(obj).subscribe(res => {
        console.log(res);
        if (res.success === true) {
          $('.pop').css('display', 'none');
          this.folders.push(res.msg);
        }
      })
    } else {
      $('#error').html('folder name already exists');
    }
  }

}
