import { NgModule } from '@angular/core';
import { ActivitiesComponent } from './components';
import { ActivityRoutingModule } from './activities.routing.module';

@NgModule({
    declarations: [ ActivitiesComponent ],
    imports: [ ActivityRoutingModule ]
})

export class ActivityModule {}