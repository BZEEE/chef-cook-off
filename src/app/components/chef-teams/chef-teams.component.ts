import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  chefTeams: ChefTeam[] = []
  selectedTeam: ChefTeam;
  numberOfTeams: number;
  numberOfChefs: number;
  chefTeamSelectForm: FormGroup

  constructor(private waitingListSvc: WaitingListService,
              private getChefsSvc: GetChefsService,
              private chefTeamsSvc: ChefTeamsService,
              private messageSvc: NzMessageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    // numer of teams can be adjusted dynamically by the user
    this.chefTeamSelectForm = this.fb.group({
      numberOfTeams: new FormControl(null, [Validators.required, Validators.min(2), Validators.pattern("^[0-9]{1,}$")])
    })

    // observe the chef endpoint to recieve callbacks whenever the chefs are refreshed from the server
    this.getChefsSvc.registeredChefObservable.subscribe(chefs => {
      this.numberOfChefs = chefs.length
      // set number of teams allowed to be between 2 and total number of registered chefs
      this.chefTeamSelectForm.get("numberOfTeams").setValidators([
        Validators.required,
        Validators.min(2),
        Validators.max(this.numberOfChefs),
        Validators.pattern("^[0-9]{1,}$")
      ])
    })

    // be notified if the chef teams are re-generated
    this.chefTeamsSvc.chefTeamsObservable.subscribe(chefTeams => {
      this.chefTeams = chefTeams
      if (chefTeams.length === 0) {
        // if chef teams are reset, then enable the form to accept input 
        this.chefTeamSelectForm.enable()
      } else {
        // if chef teams have been generated, then disable form input until teams are reset
        this.chefTeamSelectForm.disable()
      }
    })

  }

  generateChefTeams() {
    // validate that a number has been entered before generating the chef teams
    if (this.chefTeamSelectForm.get("numberOfTeams").valid) {
      // show loading screen as we request from the server
      this.loadingScreen.show()
      // clear the waiting list
      this.waitingListSvc.clearWaitingList()
      // generate the new chef teams
      this.chefTeamsSvc.generateChefTeams(this.chefTeamSelectForm.get("numberOfTeams").value).then((response) => {
        this.loadingScreen.hide()
        this.messageSvc.success("generated teams")
      }).catch((err) => {
        this.loadingScreen.hide()
        this.messageSvc.error("failed to generate teams")
      })
    } else {
      // show errors in form fields if any exist
      this.chefTeamSelectForm.markAllAsTouched()
    }
    
    
  }

  resetChefTeams() {
    this.loadingScreen.show()
    // reset chef teams
    this.chefTeamsSvc.clearChefTeams()
    // hide the team's table in the user interface
    this.selectedTeam = null
    // put all chefs back to the waiting list
    this.waitingListSvc.resetChefsToWaitingList().then((response) => {
      this.loadingScreen.hide()
      this.messageSvc.success("successfully reset teams")
    }).catch((err) => {
      this.messageSvc.error("failed to reset teams")
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
