import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
  @Output() removed: EventEmitter<any> = new EventEmitter;

  user: any;
  userIsOwner: boolean;
  constructor(private authService: AuthService, private commentService: CommentService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userIsOwner = this.comment.owner.username === this.user.username || this.user.role === 'admin';
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
