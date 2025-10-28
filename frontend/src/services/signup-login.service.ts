import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupLoginService {
  private baseUrl = 'http://localhost:8080/api/v1';

    constructor(private http: HttpClient) { }

    signup(user: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/users/signup`, user);
    }

    login(credentials: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/signin`, credentials);
    }

}
