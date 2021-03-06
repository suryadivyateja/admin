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
import { AllusersComponent } from './allusers/allusers.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AllOrganisationsComponent } from './all-organisations/all-organisations.component';
import { AddOrganisationComponent } from './add-organisation/add-organisation.component';
import { EditOrganisationComponent } from './edit-organisation/edit-organisation.component';


const routes:Routes=[
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'all-users',component:AllusersComponent},
  {path:'add-user',component:AddUserComponent},
  {path:'edit_user/:id',component:EditUserComponent},
  {path:'add-category',component:AddCategoryComponent},
  {path:'all-categories',component:AllCategoriesComponent},
  {path:'edit_category/:id',component:EditCategoryComponent},
  {path:'all-organisations',component:AllOrganisationsComponent},
  {path:'add-organisation',component:AddOrganisationComponent},
  {path:'edit_organisation/:id',component:EditOrganisationComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AllusersComponent,
    AddUserComponent,
    EditUserComponent,
    AddCategoryComponent,
    AllCategoriesComponent,
    EditCategoryComponent,
    AllOrganisationsComponent,
    AddOrganisationComponent,
    EditOrganisationComponent
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
