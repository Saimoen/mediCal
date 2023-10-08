import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/interfaces/user.interface';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public user$: Observable<User | null> = this.authService.user$.asObservable();

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout().subscribe();
  }
}
