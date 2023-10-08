import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/shared/interfaces/blog.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() public blogs?: Blog;
}
