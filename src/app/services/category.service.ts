import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  // load categories
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  // add new category
  public addCategory(category: any): Observable<any> {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  // delete category
  public deleteCategory(categoryId: number): Observable<any> {
    return this._http.delete(`${baseUrl}/category/${categoryId}`);
  }
}
