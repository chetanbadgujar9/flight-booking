import { NgModule } from '@angular/core';
import { ActivitiesComponent } from './components';
import { Routes, RouterModule } from '@angular/router';

const activitiesRoutes: Routes = [
    { path: '', component: ActivitiesComponent }
]

@NgModule({
    imports: [ RouterModule.forChild(activitiesRoutes)],
    exports: [ RouterModule]
})

export class ActivityRoutingModule {}