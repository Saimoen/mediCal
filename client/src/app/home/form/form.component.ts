import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() public user!: User | null;
  public error!: string;
  public form: FormGroup = this.fb.group({
    titre: ['', Validators.required],
    image: ['', Validators.required],
    content: ['', Validators.required],
    category: ['Sélectionner la catégorie', Validators.required],
  });
  public searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public submit() {
    if (this.form.valid) {
      this.blogService.inscription(this.form.getRawValue()).subscribe({
        next: () => console.log('test'),
        error: (err) =>
          (this.error = err?.error || 'Mauvais mot de passe / email'),
      });
    }
  }

  public search() {
    this.blogService.searchBlogs(this.searchTerm).subscribe({
      next: () => console.log(),
      error: (err) => console.log(err),
    });
  }
}
