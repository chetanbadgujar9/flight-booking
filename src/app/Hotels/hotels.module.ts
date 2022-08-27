import { NgModule } from "@angular/core";
import { HotelsRoutingModule } from "./hotels.routing.module";
import { HotelsComponent } from './components';

@NgModule({
    declarations: [ HotelsComponent ],
    imports: [ HotelsRoutingModule ]
})

export class HotelsModule {}