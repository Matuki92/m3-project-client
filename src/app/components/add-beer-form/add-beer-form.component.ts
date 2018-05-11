import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-add-beer-form',
  templateUrl: './add-beer-form.component.html',
  styleUrls: ['./add-beer-form.component.css']
})
export class AddBeerFormComponent implements OnInit {

  feedbackEnabled = false;
  error: string;
  processing = false;
  beer: object;
  
  constructor(private beerService: BeerService) {
  }
  
  ngOnInit() {
    this.defaultBeer();
  }
  
  defaultBeer() {
    this.beer = {
      active: false,
      color: "#ffd700"
    };
  }
  
  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.beerService.addBeer(this.beer)
        .then((result) => {
          this.processing = false;
          this.feedbackEnabled = false;
          this.defaultBeer();
        })
        .catch(err => {
          this.error = err.error.error;
          this.processing = false;
          this.feedbackEnabled = false;
        })
    }
  }

}
