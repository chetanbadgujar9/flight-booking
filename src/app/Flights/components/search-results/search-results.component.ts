import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/Core';
import { formDataI } from 'src/app/Core/Model/formData';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public formData: formDataI = <formDataI>{};
  public flightData: any[] = [];
  public searchResult: any[] = [];
  public subscription: Subscription[] = [];
  public showSort: boolean = false;
  public showFilter: boolean = false;
  public showDataNotFound: boolean = false;
  public showNoFilterData: boolean = false;
  public minRange: number = 0;
  public maxRange: number = 0;
  public stopFilterData: any;

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.stopFilterData = this.flightService.getStopFilter();
    this.formData = this.flightService.getFlightFormData();
    this.getFlightDetails();
  }

  getFlightDetails() {
    this.subscription.push(
      this.flightService.getFlightDetails(this.formData).subscribe(
        (result) => {
          setTimeout(() => {
            this.flightData = result;
            this.searchResult = JSON.parse(JSON.stringify(this.flightData));
            if(!this.flightData.length) {
              this.showDataNotFound = true;
            }

            this.getPriceRange();
            this.sortData();
            this.flightService.setDefaultFilter(this.maxRange);
          }, 3000);
        }
      )
    )
  }

  getPriceRange() {
    this.searchResult.sort((prevItem, nextItem) => {
      return prevItem?.prices[0]?.price - nextItem?.prices[0]?.price;
    });
    this.minRange = this.searchResult[0]?.prices[0]?.price;
    this.maxRange = this.searchResult[this.searchResult.length - 1]?.prices[0]?.price;
    this.flightService.setMaxRange(this.maxRange);
  }

  gotoFlightsPage() {
    this.router.navigate(['/flights']);
  }

  onSortBack() {
    this.showSort = false;
  }

  onFilterBack() {
    this.showFilter = false;
  }

  showStops(stop: number): string {
    if (!stop) {
      return 'Non Stop';
    } else {
      return stop === 1 ? `${stop} Stop` : `${stop} Stops`
    }
  }

  setFareBadge(fare: number): string {
    if (fare === 1) {
      return `${fare} Seat left`;
    } else {
      return `${fare} Seats left`;
    }
  }

  onSort() {
    this.showSort = true;
  }

  onFilter() {
    this.showFilter = true;
  }

  sortData() {
    this.showSort = false;
    const sortField = this.flightService.getAppliedSort();

    switch (sortField.sortFlights) {
      case 'priceHtL':
        this.flightData.sort((prevItem, nextItem) => {
          return prevItem?.prices[0]?.price - nextItem?.prices[0]?.price;
        });
        break;
      case 'priceLtH':
        this.flightData.sort((prevItem, nextItem) => {
          return nextItem?.prices[0]?.price - prevItem.prices[0]?.price;
        });
        break;
      case 'durationStL':
        this.flightData.sort((prevItem, nextItem) => {
          return prevItem.totalTime.localeCompare(nextItem.totalTime);
        });
        break;
      case 'durationLtS':
        this.flightData.sort((prevItem, nextItem) => {
          return nextItem.totalTime.localeCompare(prevItem.totalTime);
        });
        break;
      case 'airlineAtZ':
        this.flightData.sort((prevItem, nextItem) => {
          if ( prevItem.airlineName < nextItem.airlineName ){
            return -1;
          }
          if ( prevItem.airlineName > nextItem.airlineName ){
            return 1;
          }
          return 0;
        });
        break;
      case 'airlineZtA':
        this.flightData.sort((prevItem, nextItem) => {
          if ( prevItem.airlineName < nextItem.airlineName ){
            return 1;
          }
          if ( prevItem.airlineName > nextItem.airlineName ){
            return -1;
          }
          return 0;
        });
        break;
    }
  }

  filterData() {
    this.showFilter = false;
    const filter = this.flightService.getAppliedFilter();
    const stopValues: number[] = [];
    const stopFilter = this.flightService.stopFilter;
    filter.name.forEach((stop: any, index: any) => {
      if(stop) {
        stopValues.push(stopFilter[index].value)
      }
    });
    this.flightData = this.searchResult.filter(flight => {
      return this.getPriceFilter(flight, filter) && this.getStopsFilter(flight, stopValues);
    });

    if(!this.flightData?.length) {
      this.showNoFilterData = true;
      return;
    }

    this.showNoFilterData = false;

    this.sortData();
  }

  getPriceFilter(flight: any, filter: any) {
    return flight.prices[0].price <= filter.priceRange && flight.prices[0].price >= this.minRange;
  }

  getStopsFilter(flight: any, stopValues: number[]) {
    if(!stopValues.length) {
      return flight;
    }
    return stopValues.indexOf(flight.restStop) > -1;
  }

  generateFakeSkeleton(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
