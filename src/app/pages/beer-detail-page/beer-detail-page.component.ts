import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-beer-detail-page',
  templateUrl: './beer-detail-page.component.html',
  styleUrls: ['./beer-detail-page.component.css']
})
export class BeerDetailPageComponent implements OnInit {

  feedbackEnabled = false;
  error: string;
  processing = false;

  beer: any;
  beerFav: boolean;
  favText: string;

  comments: [object];
  newComment: string = '';

  user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private commentService: CommentService, 
    private beerService: BeerService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
    this.updatePageInfo();
  }

  updatePageInfo() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.beerService.getOne(id)
        .then(data => {
          this.beer = data;
          this.comments = this.beer.comments.reverse();

          this.user = this.authService.getUser()

          this.checkIfFav();
        })
        .catch(err => console.log(err));
    });
  }

  checkIfFav() {

    for (let i = 0; i < this.user.favorites.length; i++) {
      if (this.user.favorites[i] === this.beer._id) {
        this.beerFav = true;
        return;
      } 
    }
    this.beerFav = false;
  }

  toggleFav() {
    setTimeout(() => {

      if (!this.beerFav) {
        this.user.favorites.push(this.beer._id);
      } else {
        this.user.favorites.splice(this.user.favorites.indexOf(this.beer._id), 1);
      }
      
      this.userService.update(this.user)
      .then(() => {
        this.checkIfFav();
        })
        .catch(err => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }, 500)
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      const data = {
        comment: this.newComment
      };
      this.commentService.add(data)
        .then((result) => {
          this.beer.comments.push(result);
        return this.beerService.update(this.beer)
          .then(() => {
            this.updatePageInfo();
            this.processing = false;
            this.feedbackEnabled = false;
            this.newComment = '';
          });
        })
        .catch(err => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
