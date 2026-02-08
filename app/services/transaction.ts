import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  private apiUrl = 'http://localhost:8080/api/transactions';
  constructor(private http:HttpClient) {}

  getAll() : Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getStats(): Observable<any>{
    return this.http.get(`${this.apiUrl}/stats`);
  }
  addTs(transaction: any): Observable<any>{
    return this.http.post(this.apiUrl, transaction);
  }
  deleteTs(id: number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
