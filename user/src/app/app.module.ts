import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthGuard } from "./services/auth.guard";
import { ValidateService } from './services/validate.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { OrgService } from './services/org.service';
import { HomeComponent } from './home/home.component';

const routes:Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [AdminService,AuthGuard,ValidateService,UserService,OrgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
