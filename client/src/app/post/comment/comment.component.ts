import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/shared/interfaces/comment.interface';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() public idBlog!: string | null;
  @Input() public comment?: Comment[];
  public commentContent!: FormGroup;

  constructor(
    private commentService: CommentService,
    private form: FormBuilder
  ) {}

  ngOnInit() {
    this.commentContent = this.form.group({
      comment: '',
    });
  }

  postComment() {
    this.commentService
      .inscription(this.idBlog, this.commentContent?.value)
      .subscribe({
        next: (comment) => console.log(comment),
        error: (err) => console.log(err),
      });
  }
}
