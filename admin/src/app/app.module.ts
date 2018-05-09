import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AuthGuard } from "./auth.guard";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminService } from './admin.service';
import { HomeComponent } from './home/home.component';
import { ValidateService } from './validate.service';


const routes:Routes=[
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [AdminService,AuthGuard,ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
