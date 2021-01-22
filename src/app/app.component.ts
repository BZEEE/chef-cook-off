import { Component, OnInit } from '@angular/core';
import { WaitingListService } from './services/waiting-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private waitingListSvc: WaitingListService) {}

  ngOnInit(): void {
    this.waitingListSvc.resetChefsToWaitingList()
  }
}
