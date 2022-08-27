import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFlightsComponent } from './sort-flights.component';

describe('SortFlightsComponent', () => {
  let component: SortFlightsComponent;
  let fixture: ComponentFixture<SortFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortFlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
