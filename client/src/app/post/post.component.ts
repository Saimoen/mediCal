import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../shared/services/blog.service';
import { Blog } from '../shared/interfaces/blog.interface';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../shared/services/comment.service';
import { Comment } from '../shared/interfaces/comment.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public idBlog!: string | null;
  @Input() public blogs?: Blog;
  @Input() public comment?: Comment[];

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idBlog = id;
    });

    this.blogService.getBlogById(this.idBlog).subscribe({
      next: (blog) => {
        this.blogs = blog;
      },
      error: (err) => console.log(err),
    });

    this.commentService.getCommentByID(this.idBlog).subscribe({
      next: (comment) => {
        this.comment = comment;
        console.log(comment);
      },
      error: (err) => console.log(err),
    });
  }
}
