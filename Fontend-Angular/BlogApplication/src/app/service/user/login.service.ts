import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:9001';

  constructor(private http: HttpClient) { }

  loginUser(userCredentials: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, userCredentials);
  }
}
