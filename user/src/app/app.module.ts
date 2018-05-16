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


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule
  ],
  providers: [AdminService,AuthGuard,ValidateService,UserService,OrgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
