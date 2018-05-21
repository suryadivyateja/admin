import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthGuard } from "./services/auth.guard";
import { ValidateService } from './services/validate.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { ImageViewerModule } from "ngx-image-viewer";

import { AppComponent } from './app.component';
import { OrgService } from './services/org.service';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileOrgComponent } from './profile-org/profile-org.component';
import { InfoComponent } from './profile-org/info/info.component';
import { ImagesComponent } from './profile-org/images/images.component';
import { VideosComponent } from './profile-org/videos/videos.component';
import { RequirementsComponent } from './profile-org/requirements/requirements.component';
import { GalleryComponent } from './profile-org/gallery/gallery.component';
const routes:Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'org-profile/:id',
  component:ProfileOrgComponent,
  children:[
    {path:'',redirectTo:'info',pathMatch:'full'},
  {path:'info',component:InfoComponent},
  {path:'images',component:ImagesComponent},
  {path:'videos',component:VideosComponent},
  {path:'requirements',component:RequirementsComponent},
   {path:'gallery/:id',component:GalleryComponent}]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    ProfileOrgComponent,
    InfoComponent,
    ImagesComponent,
    VideosComponent,
    RequirementsComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    ImageViewerModule.forRoot()
  ],
  providers: [AdminService,AuthGuard,ValidateService,UserService,OrgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
