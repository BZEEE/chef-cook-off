import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chef } from 'src/app/models/chef';
import { ChefTeam } from 'src/app/models/chef-team';
import { ChefTeamsService } from 'src/app/services/chef-teams.service';
import { GetChefsService } from 'src/app/services/get-chefs.service';
import { WaitingListService } from 'src/app/services/waiting-list.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';

@Component({
  selector: 'app-chef-teams',
  templateUrl: './chef-teams.component.html',
  styleUrls: ['./chef-teams.component.css']
})
export class ChefTeamsComponent implements OnInit {
  @ViewChild(LoadingScreenComponent, {static: false}) loadingScreen: LoadingScreenComponent;
  chefTeams: ChefTeam[] = [new ChefTeam(1, []), new ChefTeam(2, [])]
  selectedTeam: ChefTeam;
  numberOfTeams: number;
  numberOfChefs: number;
  chefTeamSelectForm: FormGroup

  constructor(private waitingListSvc: WaitingListService,
              private getChefsSvc: GetChefsService,
              private chefTeamsSvc: ChefTeamsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.chefTeamSelectForm = this.fb.group({
      numberOfTeams: new FormControl(null, [Validators.required, Validators.min(2)])
    })

    this.getChefsSvc.registeredChefObservable.subscribe(chefs => {
      this.numberOfChefs = chefs.length
      // set number of teams allowed to be between 2 and total number of registered chefs
      this.chefTeamSelectForm.get("numberOfTeams").setValidators([
        Validators.required,
        Validators.min(2),
        Validators.max(this.numberOfChefs)
      ])
    })

    // be notified if the chef teams are re-generated
    this.chefTeamsSvc.chefTeamsObservable.subscribe(chefTeams => {
      this.chefTeams = chefTeams
    })

  }

  generateChefTeams() {
    if (this.chefTeamSelectForm.get("numberOfTeams").valid) {
      this.chefTeamsSvc.generateChefTeams(this.chefTeamSelectForm.get("numberOfTeams").value)
      this.waitingListSvc.clearWaitingList()
      this.chefTeamSelectForm.disable()
      this.loadingScreen.show()
      setTimeout(() => {
        this.loadingScreen.hide()
      }, 1000);
    } else {
      this.chefTeamSelectForm.markAllAsTouched()
    }
    
    
  }

  resetChefTeams() {
    this.chefTeamsSvc.clearChefTeams()
    this.waitingListSvc.resetChefsToWaitingList()
    this.chefTeamSelectForm.enable()
    this.selectedTeam = null
    this.loadingScreen.show()
    setTimeout(() => {
      this.loadingScreen.hide()
    }, 1000);
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
