import { locationDataI, FlightService, formDataI } from './../../../Core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  public departMinDate: string = '';
  public returnMinDate: string = '';
  public locationData: locationDataI[] = [];
  public subscription: Subscription[] = [];
  public flightForm: FormGroup = <FormGroup>{};
  public selectedDepartLocations = new Set<string>();
  public selectedReturnLocations = new Set<string>();
  public classList = ['Economy', 'Basic', 'Main'];
  public travellerList = [1,2,3,4,5,6,7,8,9];

  constructor( private flightService: FlightService, private fb: FormBuilder, private router: Router ) { }

  ngOnInit(): void {
    const d = new Date();
    const month = (d.getMonth() + 1) < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1;
    this.departMinDate = this.returnMinDate = `${d.getFullYear()}-${month}-${d.getDate()}`;

    this.createForm();
    this.getLocationList();

    this.flightForm.get('departure')?.valueChanges.subscribe(val => {
      this.selectedDepartLocations.clear();
      this.selectedDepartLocations.add(val);
    });

    this.flightForm.get('destination')?.valueChanges.subscribe(val => {
      this.selectedReturnLocations.clear();
      this.selectedReturnLocations.add(val);
    });

    this.flightForm.get('departDate')?.valueChanges.subscribe(val => {
      if(val) {
        this.returnMinDate = val;
        this.flightForm.controls['returnDate'].setValue(val);
      }
    })
  }

  getLocationList() {
    this.subscription.push(
      this.flightService.getLocationList().subscribe(
        (result: locationDataI[]) => {
          if(result) {
            this.locationData = result;

            const formData: formDataI = this.flightService.getFlightFormData();
            if(formData && Object.keys(formData).length) {
              this.flightForm.setValue(formData);
            } else {
              this.flightForm.controls['departure'].setValue(this.locationData[0]?.iata);
              this.flightForm.controls['destination'].setValue(this.locationData[1]?.iata);
            }
          }
        }
      )
    )
  }

  createForm() {
    this.flightForm = this.fb.group({
      departure: [''],
      destination: [''],
      departDate: [this.departMinDate, Validators.required],
      returnDate: [this.returnMinDate, Validators.required],
      travellers: [1, Validators.required],
      class: [this.classList[0], Validators.required]
    });
  }

  isDepartSelected(loc: string) {
    return this.selectedReturnLocations.has(loc);
  }

  isReturnSelected(loc: string) {
    return this.selectedDepartLocations.has(loc);
  }

  onSearch(flightForm: FormGroup) {
    this.flightForm.markAllAsTouched();

    if(flightForm.valid) {
      this.flightService.setFlightFormData(flightForm.value);
      this.router.navigate(['/flight-results']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
