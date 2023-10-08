import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedin$.pipe(
      first(),
      tap((isLoggedin: boolean) => {
        if (!isLoggedin) {
          this.router.navigateByUrl('/connexion');
        }
      })
    );
  }
}

/* Il permet simplement de vérifier si l'utilisateur est connecté. S'il n'est pas connecté, et que l'utilisateur tente d'accéder à une page protégée, il sera redirigé sur la page de connexion. */
