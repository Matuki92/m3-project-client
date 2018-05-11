import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  
  @Output() submit: EventEmitter<any> = new EventEmitter();
  constructor() {
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
      this.submit.emit(this.beer)
      this.defaultBeer();
    }
  }
}
