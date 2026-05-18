import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticleRequest } from '../models/article.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly url = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getAll(categoryId?: number, type?: number): Observable<Article[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId.toString());
    if (type != null) params = params.set('type', type.toString());
    return this.http.get<Article[]>(this.url, { params });
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`);
  }

  create(request: ArticleRequest): Observable<Article> {
    return this.http.post<Article>(this.url, request);
  }

  update(id: number, request: ArticleRequest): Observable<Article> {
    return this.http.put<Article>(`${this.url}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
