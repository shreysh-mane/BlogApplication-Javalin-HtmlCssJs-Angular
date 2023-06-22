import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './service/user/signup.service';
import { SigninComponent } from './components/signin/signin.component';
import { LoginService } from './service/user/login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogService } from './service/blog/blog.service';
import { UserService } from './service/user/user.service';
import { ViewBlogComponent } from './components/blog/view-blog/view-blog.component';
import { UpdateBlogComponent } from './components/blog/update-blog/update-blog.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    ViewBlogComponent,
    UpdateBlogComponent,
    AddBlogComponent,
    ViewProfileComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    SignupService,
    LoginService,
    BlogService, 
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
