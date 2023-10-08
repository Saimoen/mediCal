import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  public inscription(blog: Blog): Observable<any> {
    return this.http.post('/api/blog', blog);
  }

  public getBlog(): Observable<any> {
    return this.http.get('/api/blog/get');
  }

  public getBlogById(id: string | null): Observable<any> {
    return this.http.get(`api/blog/get/${id}`);
  }

  searchBlogs(searchTerm: string): Observable<any> {
    let params = new HttpParams().set('search', searchTerm); // Créez un nouvel objet HttpParams avec le paramètre de recherche

    return this.http.get(`api/blog/search`, { params });
  }

  public deleteBlog(id: string): Observable<any> {
    const url = `/api/blog/${id}`;
    return this.http.delete(url);
  }
}
