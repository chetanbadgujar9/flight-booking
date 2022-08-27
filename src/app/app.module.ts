import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './Shared';
import { CoreModule } from './Core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./Flights/flights.module').then(m => m.FlightModule)},
  { path: 'cars', loadChildren: () => import('./Cars/cars.module').then(m => m.CarsModule)},
  { path: 'hotels', loadChildren: () => import('./Hotels/hotels.module').then(m => m.HotelsModule)},
  { path: 'activities', loadChildren: () => import('./Actvities/activities.module').then(m => m.ActivityModule)},
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
