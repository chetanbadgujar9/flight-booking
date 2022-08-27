import { FlightService } from 'src/app/Core';
import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-filter-flights',
  templateUrl: './filter-flights.component.html',
  styleUrls: ['./filter-flights.component.scss']
})
export class FilterFlightsComponent implements OnInit, AfterContentInit  {
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  @Input() minRange: number = 0;
  @Input() maxRange: number = 0;
  @Input() stopFilterData: any;

  filterForm: FormGroup = <FormGroup>{};
  
  constructor(private fb: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterContentInit () {
    const filter = this.flightService.getAppliedFilter();
    this.filterForm.patchValue(filter);
  }

  createForm() {
    this.filterForm = this.fb.group({
      priceRange : [],
      name: this.fb.array(this.buildStopFilter())
    });
  }

  get stopNames() {
    return this.filterForm.get('name') as FormArray;
  };

  buildStopFilter() {
    return this.stopFilterData.map((elem: any) => {
      return this.fb.control(elem.selected);
    })
  }

  onFilterSubmit(filterForm: FormGroup) {
    this.flightService.setAppliedFilter(filterForm.value);
    this.onFilter.emit();
  }

  resetForm() {
    this.filterForm.get('priceRange')?.setValue(this.flightService.getMaxRange());
    let frmArray = this.filterForm.get('name') as FormArray;
    frmArray.reset();
  }
}
