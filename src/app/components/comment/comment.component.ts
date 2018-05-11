import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: object;
  @Output() removed: EventEmitter<any> = new EventEmitter;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  handleRemove(comment) {
    this.commentService.delete(comment)
      .then(() => {
        this.removed.emit(comment);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
