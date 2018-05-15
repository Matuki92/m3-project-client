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

  // Form validation variables
  feedbackEnabled = false;
  error: string;
  processing = false;

  //Beer and favorites
  beer: any;
  beerFav: boolean;
  favText: string;

  //Comments
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
    this.user = this.authService.getUser();
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.beerService.getOne(id)
        .then(data => {
          this.beer = data;
          this.reverseComments();
          this.checkIfFav();
        })
        .catch(err => console.log(err));
      });
  }
  // Show comments in reverse order
  reverseComments() {
    this.comments = this.beer.comments.reverse();
  }

  // Checks if the beer shown is in the user's favorites
  checkIfFav() {
    for (let i = 0; i < this.user.favorites.length; i++) {
      if (this.user.favorites[i] === this.beer._id) {
        this.beerFav = true;
        this.favText = 'Favorite!'
        return;
      }
    }
    this.beerFav = false;
    this.favText = 'Add this beer to your favorites!'
  }

  // Adds or removes the beer from the user favorites
  toggleFav() {
    let promise;

    if (!this.beerFav) {
      this.user.favorites.push(this.beer._id);
      promise = this.userService.addFavorite(this.beer._id);
    } else {
      this.user.favorites.splice(this.user.favorites.indexOf(this.beer._id), 1);
      promise = this.userService.removeFavorite(this.beer._id)
    }
    promise.then(() => {
      this.checkIfFav();
      })
      .catch(err => {
        this.error = err.error.code;
        this.processing = false;
        this.feedbackEnabled = false;
      });
  }

  // Creates the comment and sends data to backend
  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.beerService.addComment(this.beer._id, this.newComment)
        .then((beer) => {
          this.beer = beer
          this.reverseComments();
          this.processing = false;
          this.feedbackEnabled = false;
          this.newComment = '';
        })
        .catch(err => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

  removeComment(comment) {
    this.comments.splice(this.comments.indexOf(comment._id));
    this.updatePageInfo();
  }
}
