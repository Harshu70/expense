import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  login(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  saveToken(tkn: string): void{
    localStorage.setItem('token', tkn);
  }
  getToken():string | null{
    return localStorage.getItem('token');
  }
  logout(): void{
    localStorage.removeItem('token');
  }
}
