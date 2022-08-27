import { FlightService } from 'src/app/Core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-flights',
  templateUrl: './sort-flights.component.html',
  styleUrls: ['./sort-flights.component.scss']
})
export class SortFlightsComponent implements OnInit {
  @Output() onSort: EventEmitter<any> = new EventEmitter();
  public sortForm: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.sortForm = this.fb.group({
      sortFlights: [this.flightService.getAppliedSort().sortFlights]
    });
  }

  onSortSubmit(sortForm: FormGroup) {
    this.flightService.setAppliedSort(sortForm.value);
    this.onSort.emit();
  }

}
