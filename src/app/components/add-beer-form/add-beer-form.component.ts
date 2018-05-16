import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-beer-form',
  templateUrl: './add-beer-form.component.html',
  styleUrls: ['./add-beer-form.component.css']
})
export class AddBeerFormComponent implements OnInit {

  feedbackEnabled = false;
  error: string;
  processing = false;

  @Input() beerToEdit: any;
  @Output() newBeer: EventEmitter<any> = new EventEmitter();
  @Output() editedBeer: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    this.beerToEdit = {
      active: false,
      color: "#ffd700"
    };
  }

  submitForm(form) {
    this.processing = true;
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid && !this.beerToEdit._id) {
      this.newBeer.emit(this.beerToEdit);
    } else if (form.valid && this.beerToEdit._id) {
      this.editedBeer.emit(this.beerToEdit);
    }
    this.processing = false;
    this.feedbackEnabled = false;
  }
}
