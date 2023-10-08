import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User | null> = this.authService.user$.asObservable();
  public userName: string | undefined = '';
  public commentContent!: FormGroup;

  constructor(private authService: AuthService,
              private form: FormBuilder
              ) {}

  ngOnInit(): void {
    this.commentContent = this.form.group({
      date: '',
      prenom: '',
      nom: ''
    });
  }

  getName() {
    if(this.user$) {
      this.user$.forEach(user => this.userName = user?.name);
    } 
    return this.userName;
  }

  reserverRdv() {
    console.log(this.commentContent.value)
  }

}
