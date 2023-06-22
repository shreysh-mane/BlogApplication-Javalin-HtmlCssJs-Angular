import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  [x: string]: any;
  profile: any;
  userId:any;

  constructor(
    private route: ActivatedRoute,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData')!).id;
    this.fetchProfileDetails(this.userId);
  }

  fetchProfileDetails(profileId: string): void {
    this.userService.getUser(profileId)
      .subscribe(
        (profile: any) => {
          this.profile = profile;
          
        },
        error => {
          console.error('Error fetching profile details:', error);
        }
      );
  }

  updateProfile(){
    this.router.navigate(['update-user']);
  }
  
}
