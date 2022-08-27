import { NgModule } from "@angular/core";
import { FlightRoutingModule } from "./flights.routing.module";
import { FlightsComponent, SortFlightsComponent, SearchResultsComponent, FilterFlightsComponent } from './components';
import { SharedModule } from "../Shared"; 

@NgModule({
    declarations: [ FlightsComponent, SortFlightsComponent, SearchResultsComponent, FilterFlightsComponent ],
    imports: [ SharedModule, FlightRoutingModule ]
})

export class FlightModule {}