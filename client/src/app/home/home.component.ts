import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/interfaces/user.interface';
import { Blog } from '../shared/interfaces/blog.interface';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() public user!: User | null;
  @Input() public blogs!: Blog[];
  @Input() public idBlog!: string;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      // Traitez la valeur de l'utilisateur ici
      this.user = user;
    });
    this.blogService.getBlog().subscribe({
      next: (blog) => (this.blogs = blog),
      error: (err) => console.log(err),
    });
  }
}
