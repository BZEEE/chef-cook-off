import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chef } from '../models/chef';
import { ChefTeam } from '../models/chef-team';
import { GetChefsService } from './get-chefs.service';
import { WaitingListService } from './waiting-list.service';

@Injectable({
  providedIn: 'root'
})
export class ChefTeamsService {

  chefTeamsObservable: BehaviorSubject<ChefTeam[]> = new BehaviorSubject([])

  constructor(private getChefsSvc: GetChefsService,
              private waitingListService: WaitingListService) { }

  generateChefTeams(numberOfTeams: number) {
    this.getChefsSvc.getChefs().subscribe(chefs => {
      // calculate total number of players required to make all teams have the same number of players
      // eg. if 39 players need to be split into 5 teams, then the most players we can use is 35
      let totalPlayers = chefs.length - (chefs.length % numberOfTeams)
      // evenly distribute kitchen teams and notify all observers of the new teams
      this.chefTeamsObservable.next(this.evenlyDistributeTeams(numberOfTeams, totalPlayers, chefs))
      // get the unassigned chefs and notify all observers of the new waiting list
      this.waitingListService.setWaitingList(this.getUnassignedChefs(totalPlayers, chefs))
    })
  }

  evenlyDistributeTeams(numberOfTeams: number, totalPlayers: number, chefs: Chef[]): ChefTeam[] {
    let chefTeams: ChefTeam[] = []
    for (let i = 1; i <= numberOfTeams; i++) {
      chefTeams.push(new ChefTeam(i, []))
    }

    for (let i = 0; i < totalPlayers; i++) {
      // figure out which team currently has the lowest overall score
      // and add the next chef to that team
      // repeat until all chefs have been added to a team
      let lowestScoreTeam: ChefTeam = this.findTeamWithLowestScore(chefTeams)
      lowestScoreTeam.chefs.push(chefs[i])
      // recalculate score for the team that just had a chef pushed to it
      lowestScoreTeam.recalculateTeamScore()
    }
    return chefTeams
  }

  findTeamWithLowestScore(teams: ChefTeam[]) {
    let currentLowestTeam = teams[0]
    teams.forEach(team => {
      if (team.totalTeamScore < currentLowestTeam.totalTeamScore) {
        currentLowestTeam = team
      }
    })
    return currentLowestTeam
  }

  getUnassignedChefs(totalPlayers: number, chefs: Chef[]) {
    // return the remaining chefs at the end of the list 
    // that were not assigned to a kitchen team
    return chefs.slice(totalPlayers, chefs.length)
  }

  clearChefTeams() {
    this.chefTeamsObservable.next([])
  }
}
