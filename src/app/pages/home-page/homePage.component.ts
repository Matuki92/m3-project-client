import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {
  beers: [any];
  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerService.listAll()
      .then(data => {
        this.beers = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
