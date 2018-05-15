import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: any;

  comments: [{}];

  beersArrowDropdown = true;
  usersArrowDropdown = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const user = this.authService.getUser();
    this.userService.getOne(user._id)
      .then(user => {
        this.user = user;
        return this.commentService.getByUser(this.user)
          .then(comments => {
            this.comments = comments;
          });
      })
    .catch(err => {
      console.log(err);
    });
  }

  toggleBeersArrowDropdown() {
    this.beersArrowDropdown = !this.beersArrowDropdown;
  }
  toggleUsersArrowDropdown() {
    this.usersArrowDropdown = !this.usersArrowDropdown;
  }
}
