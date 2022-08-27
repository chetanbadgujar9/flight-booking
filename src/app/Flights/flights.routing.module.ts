import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SearchResultsComponent, FlightsComponent } from './components';

const flightRoutes: Routes = [
    { path: 'flights', component: FlightsComponent },
    { path: 'flight-results', component: SearchResultsComponent },
    { path: '', redirectTo: 'flights', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forChild(flightRoutes) ],
    exports: [ RouterModule ]
})

export class FlightRoutingModule {}