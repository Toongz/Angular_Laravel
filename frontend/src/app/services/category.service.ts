import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly APIUrl="http://localhost:8000/api";
  constructor(private http: HttpClient) { }
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/category/${id}`);
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/categories`);
  }
  addCategory(category: any): Observable<any>{
    const formData = new FormData();
    formData.append('category_name',category.category_name);
    return this.http.post<any>(`${this.APIUrl}/categories`, formData); 
  }
  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.APIUrl}/categories/${id}`);
  }
}
