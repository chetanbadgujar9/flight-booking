import { NgModule } from "@angular/core";
import { CarsRoutingModule } from "./cars.rouing.module";
import { CarsComponent } from './components';

@NgModule({
    declarations: [ CarsComponent ],
    imports: [ CarsRoutingModule ]
})

export class CarsModule {}