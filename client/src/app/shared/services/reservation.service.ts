import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public inscription(data: any): Observable<any> {
    return this.http.post(`/api/reservation/post`, data);
  }

  public getRendezVous(): Observable<any> {
    return this.http.get('api/reservation')
  }
}
