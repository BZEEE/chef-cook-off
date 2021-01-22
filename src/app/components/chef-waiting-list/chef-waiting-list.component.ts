import { Component, OnInit } from '@angular/core';
import { Chef } from 'src/app/models/chef';
import { ChefTeamsService } from 'src/app/services/chef-teams.service';
import { WaitingListService } from 'src/app/services/waiting-list.service';

@Component({
  selector: 'app-chef-waiting-list',
  templateUrl: './chef-waiting-list.component.html',
  styleUrls: ['./chef-waiting-list.component.css']
})
export class ChefWaitingListComponent implements OnInit {

  chefs: Chef[] = []

  constructor(private waitingListSvc: WaitingListService) { }

  ngOnInit(): void {
    // subscibe to waiting list observable
    this.waitingListSvc.waitingListObservable.subscribe(chefs => {
      this.chefs = chefs
    })
  }

  getMealScore(targetMealType: string, mealScores: Object[]) {
    let score = ""
    // loop through all meal scores for that chef and find the score
    // of the target mealtype
    mealScores.forEach(meal => {
      if (meal["type"] === targetMealType) {
        score = meal["rating"]
      }
    })
    return score
  }
 
}
