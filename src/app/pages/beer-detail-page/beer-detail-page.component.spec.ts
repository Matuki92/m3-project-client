import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailPageComponent } from './beer-detail-page.component';

describe('BeerDetailPageComponent', () => {
  let component: BeerDetailPageComponent;
  let fixture: ComponentFixture<BeerDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
