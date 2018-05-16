import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  @Input() beer: any;
  @Output() outputBeer: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitBeer() {
    this.outputBeer.emit(this.beer);
  }
}
