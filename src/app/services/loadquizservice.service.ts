import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadquizserviceService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllActiveQuizzes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/active`);
  }

  getActiveQuizzesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/category/${categoryId}/active`);
  }
}
