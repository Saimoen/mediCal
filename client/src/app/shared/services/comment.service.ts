import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  public inscription(data: any): Observable<any> {
    return this.http.post(`/api/comment/post`, data);
  }

  public getCommentByID(id: string | null): Observable<any> {
    return this.http.get(`/api/comment/${id}`);
  }

  public getRendezVous(): Observable<any> {
    return this.http.get('api/comment')
  }
}
