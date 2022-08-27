import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HotelsComponent } from './components';

const hotelRoutes: Routes = [
    { path: '', component: HotelsComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(hotelRoutes) ],
    exports: [ RouterModule ]
})

export class HotelsRoutingModule {}