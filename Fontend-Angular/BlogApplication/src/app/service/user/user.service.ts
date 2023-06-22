import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9001/users';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateProfile(userId: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, data);
  }


}
