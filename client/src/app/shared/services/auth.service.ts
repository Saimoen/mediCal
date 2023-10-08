import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedin$: ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private http: HttpClient) {}

  getUser() {
    return this.user$.asObservable();
  }

  setUser(user: User) {
    this.user$.next(user);
  }

  public fetchCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/auth/currentuser').pipe(
      tap((user: User) => {
        this.user$.next(user);
        if (user) {
          this.isLoggedin$.next(true);
        } else {
          this.isLoggedin$.next(false);
        }
      })
    );
  }

  public inscription(user: User): Observable<any> {
    return this.http.post('/api/user', user);
  }

  public connexion(credentials: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>('/api/auth/connexion', credentials).pipe(
      tap((user: User) => {
        if (user) {
          this.user$.next(user);
          this.isLoggedin$.next(true);
        }
      })
    );
  }

  public logout(): Observable<any> {
    return this.http.delete('/api/auth/logout').pipe(
      tap(() => {
        this.user$.next(null);
      })
    );
  }
}
