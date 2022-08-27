import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { formDataI } from '../Model/formData';
import { locationDataI } from "../Model/locationData";

@Injectable()

export class FlightService {
    public locationUrl = 'assets/data/location.json';
    public flightUrl = 'assets/data/searchResult.json';

    public maxRange: number = 0;
    public formData: formDataI = <formDataI>{};
    public sortData: any = { sortFlights: 'priceHtL'};
    public filterData:any = { priceRange : 0, name: []};
    public stopFilter: any[] = [{name: 'Non Stop', value: 0, selected: false}, {name: '1 Stop', value: 1, selected: false}, {name: '1+ Stop', value: 2, selected: false}]

    constructor(private http: HttpClient){
    }

    setDefaultFilter(price: number) {
        this.filterData.priceRange = price;
        this.filterData.name = [];
        this.stopFilter.forEach(elem => {
            this.filterData.name.push(elem.selected);
        })
    }

    getLocationList(): Observable<locationDataI[]> {
        return this.http.get<locationDataI[]>(this.locationUrl);
    }

    setFlightFormData(formData: formDataI) {
        this.formData = formData;
    }

    getFlightFormData() {
        return this.formData;
    }

    getFlightDetails(formData: formDataI): Observable<any[]> {
        return this.http.get<any[]>(this.flightUrl).pipe(
            map((res: any[]) => {
                return res.filter(flight => flight.departure === formData.departure && flight.destination === formData.destination && flight.departuredDate === formData.departDate);
            })
        )
    }

    getAppliedSort(){
        return this.sortData;
    }

    setAppliedSort(sortData: any) {
        this.sortData = sortData;
    }

    setStopFilter(stopFilter: any) {
        this.stopFilter = stopFilter;
    }

    getStopFilter() {
        return this.stopFilter;
    }

    setAppliedFilter(filterData: any) {
        this.filterData = filterData;
    }

    getAppliedFilter() {
        return this.filterData;
    }

    setMaxRange(maxRange: number) {
        this.maxRange = maxRange;
    }

    getMaxRange() {
        return this.maxRange;
    }
}