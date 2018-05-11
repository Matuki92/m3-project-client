import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';

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

  comments: [object];
  newComment: string = '';

  constructor(
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
        })
        .catch(err => console.log(err));
    });
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
          //this.beer = updatedBeer;

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
