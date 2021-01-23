import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chef } from '../models/chef';
import { GetChefsService } from './get-chefs.service';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {
  
  waitingListObservable: BehaviorSubject<Chef[]> = new BehaviorSubject([])

  constructor(private getChefsSvc: GetChefsService) { }

  resetChefsToWaitingList() {
    this.getChefsSvc.getChefs().subscribe(chefs => {
      this.waitingListObservable.next(chefs)
    })
  }

  setWaitingList(chefs: Chef[]) {
    this.waitingListObservable.next(chefs);
  }

  clearWaitingList() {
    this.waitingListObservable.next([])
  }
}
