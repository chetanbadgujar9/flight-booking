// Modules
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

//Components
import { HeaderComponent, TabsComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSkeletonLoaderModule,
        RouterModule
    ],
    declarations: [ HeaderComponent, TabsComponent ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSkeletonLoaderModule,
        RouterModule,
        HeaderComponent, TabsComponent
    ]
})

export class SharedModule {}