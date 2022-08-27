import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CarsComponent } from './components';

const carRoutes: Routes = [
    { path: '', component: CarsComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(carRoutes) ],
    exports: [ RouterModule ]
})

export class CarsRoutingModule {}