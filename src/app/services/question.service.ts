import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // Method to get a single question by ID
  public getQuestion(id: number) {
    return this._http.get(`${baseUrl}/question/${id}`);
  }

  // Method to delete a question by ID
  public deleteQuestion(id: number) {
    return this._http.delete(`${baseUrl}/question/${id}`);
  }

  // Method to update a question
  public updateQuestion(id: number, question: any) {
    return this._http.put(`${baseUrl}/question/${id}`, question);
  }
}
