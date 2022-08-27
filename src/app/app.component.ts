import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { tabDataI, TabService } from './Core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public tabData: tabDataI[] = [];
  public showHeader = true;
  routingUrls = ['', '/flights', '/cars', '/hotels', '/activities'];

  constructor(private tabService: TabService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        if(this.routingUrls.indexOf(event.url) > -1) {
          this.showHeader =  true;
        } else {
          this.showHeader = false;
        }
      }
    });

    this.tabService.getTabs().subscribe(
      (res: tabDataI[]) => {
        this.tabData = res;
      }
    )
  }

}
