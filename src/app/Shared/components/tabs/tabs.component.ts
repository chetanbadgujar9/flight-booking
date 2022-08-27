import { tabDataI } from '../../../Core/index';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabData: tabDataI[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
