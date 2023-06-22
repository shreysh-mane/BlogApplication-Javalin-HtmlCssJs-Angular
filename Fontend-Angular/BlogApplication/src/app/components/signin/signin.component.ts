import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/user/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  login(): void {
    const userCredentials = {
      email: this.email,
      password: this.password
    };

    this.loginService.loginUser(userCredentials)
      .subscribe(
        (data) => {
          if (data != null) {
            localStorage.setItem('userData', JSON.stringify(data));
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Invalid credentials. Please try again.');
          }
        },
        (error) => {
          console.error('An error occurred. Please try again.');
        }
      );
  }
}
