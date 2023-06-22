import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewBlogComponent } from './components/blog/view-blog/view-blog.component';
import { UpdateBlogComponent } from './components/blog/update-blog/update-blog.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, 
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view-blog/:id', component: ViewBlogComponent },
  { path: 'update-blog/:id', component: UpdateBlogComponent },
  { path: 'profile', component: ViewProfileComponent },
  {path:   'add-blog', component: AddBlogComponent},
  {path:   'update-user', component: UpdateProfileComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
