import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  feedbackEnabled = false;
  error: string;
  processing = false;

  beers: object;
  users: object;

  beer: any;
  constructor(private beerService: BeerService, private userService: UserService) { }

  ngOnInit() {
    this.updatePageInfo();
  }

  updatePageInfo() {
    this.beerService.listAll()
    .then(beers => {
      this.beers = beers;
      return this.userService.getList()
        .then(users => {
          this.users = users;
        })
    })
    .catch(err => console.log(err))
  }

  submitForm(beer) {
    this.beerService.addBeer(beer)
      .then((result) => {
        // do something
      })
      .catch(err => {
        this.error = err.error.error;
        this.processing = false;
        this.feedbackEnabled = false;
      })
  }

  deleteBeer(beer) {
    this.beerService.delete(beer)
      .then(() => {
        this.updatePageInfo();
      })
      .catch(err => {
        this.error = err.error.error;
        this.processing = false;
        this.feedbackEnabled = false;
      });
  }


  updateBeer(beer) {
    this.beer = beer;
    this.beer.active = !this.beer.active;
    
    this.beerService.update(beer)
      .then(beer => {
        this.beer = beer;
      })
      .catch( err => {
        this.error = err.error.code;
        this.processing = false;
        this.feedbackEnabled = false;
      });
  }

}
