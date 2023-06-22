import { Component } from "@angular/core";
import { SignupService } from "src/app/service/user/signup.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent {
  constructor(private signupService: SignupService, private router: Router) { }

  userData = {
    name: '',
    email: '',
    password: '',
    number: ''
  };
  
  registerUser(): void {
    this.signupService.registerUser(this.userData)
      .subscribe(
        () => {
          alert('Registration successful!');
          this.router.navigate(['/signin']); 
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
