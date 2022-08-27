import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { TabService } from "./Services/tabs.service";
import { GlobalInterceptor } from './Services/global-interceptor.service';
import { FlightService } from "./Services/flight.service";

@NgModule({
    declarations: [],
    providers: [ TabService, FlightService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true} ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if(core) {
            throw new Error("You should import core module only in the root module");
        }
    }
}