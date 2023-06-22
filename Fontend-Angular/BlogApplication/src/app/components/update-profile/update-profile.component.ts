
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  [x: string]: any;
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      number: ['', Validators.required],
      email: [''] // Will be set with user email from localStorage
    });

    // Set email value from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (userData) {
      this.profileForm.patchValue({
        email: userData.email
      });
    }
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      return;
    }

    const profileData = {
      name: this.profileForm.value.name,
      password: this.profileForm.value.password,
      number: this.profileForm.value.number,
      email: this.profileForm.value.email
    };

    const userId = JSON.parse(localStorage.getItem('userData')!).id;
    this.userService.updateProfile(userId,profileData)
      .subscribe(
        response => {
          console.log('Profile updated successfully');
          localStorage.setItem('userData', JSON.stringify(profileData));
          this.router.navigate(['/dashboard']);

          
        },
        error => {
         
          console.error('Failed to update profile:', error);
          
        }
      );
  }
}
