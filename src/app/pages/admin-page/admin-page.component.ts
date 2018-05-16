import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  beers: object;
  users: object;

  beer: any;
  beerToEdit = {};

  user: any;
  constructor(
    private authService: AuthService,
    private beerService: BeerService,
    private userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.updatePageInfo();
    this.defaultBeer();
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
        this.defaultBeer();
        this.updatePageInfo();
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteBeer(beer) {
    this.beerService.delete(beer)
      .then(() => {
        this.updatePageInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }


  updateBeer(beer, toggle) {

    let promise;

    if (toggle) {
      this.beer = beer;
      this.beer.active = !this.beer.active;
      promise = this.beerService.update(beer);
      promise.then(beer => {
        this.beer = beer;
      });
    } else {
      promise = this.beerService.update(beer);
      promise.then(() => {
        this.defaultBeer();
      });
    }

      promise.catch( err => {
        console.log(err);
      });
  }

  deleteUser(user) {
    if (user._id === this.user._id) {
      return alert(`You can't delete yourself !!`);
    }
    this.userService.delete(user._id)
      .then(() => {
        this.updatePageInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }

  editBeer(beer) {
    window.scrollTo(0,50);
    this.beerToEdit = beer;
  }

  defaultBeer() {
    this.beerToEdit = {
      active: false,
      color: "#ffd700"
    };
  }
}
