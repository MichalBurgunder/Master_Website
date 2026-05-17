import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagePair, ImagePairRequest } from '../models/image-pair.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImagePairService {
  private readonly url = `${environment.apiUrl}/image-pairs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ImagePair[]> {
    return this.http.get<ImagePair[]>(this.url);
  }

  create(request: ImagePairRequest): Observable<ImagePair> {
    return this.http.post<ImagePair>(this.url, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
