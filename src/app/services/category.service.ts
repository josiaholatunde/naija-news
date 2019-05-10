import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<{categories: any[]}>(this.baseUrl).pipe();
  }
}
