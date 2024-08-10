import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private _http: HttpClient) { }

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  // Add new quiz
  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  // Get categories (if needed)
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  public deleteQuiz(qid:any){
    return this._http.delete(`${baseUrl}/quiz/${qid}`);

  }

  //gt the single quiz

  public getQuiz(qId: number) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }


  public updateQuiz(quiz: any): Observable<any> {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }
  public submitQuiz(quizId: number, marksEarned: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(`${baseUrl}/quiz/${quizId}/submit`, { marksEarned }, { headers });
  }

}
