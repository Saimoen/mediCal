import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';
  public blogSearched?: Blog[];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const param = params.get('searchTerm');
      // Utilisez la valeur du paramètre ici
      console.log(param);
      this.searchQuery = param ?? '';
    });

    this.blogService.searchBlogs(this.searchQuery).subscribe({
      next: (blogSearched) => (this.blogSearched = blogSearched),
    });
  }
}
