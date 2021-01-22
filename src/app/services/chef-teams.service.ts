import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chef } from '../models/chef';
import { ChefTeam } from '../models/chef-team';
import { GetChefsService } from './get-chefs.service';

@Injectable({
  providedIn: 'root'
})
export class ChefTeamsService {

  chefTeamsObservable: BehaviorSubject<ChefTeam[]> = new BehaviorSubject([])

  constructor(private getChefsSvc: GetChefsService) { }

  generateChefTeams(numberOfTeams: number) {
    this.getChefsSvc.getChefs().subscribe(chefs => {
      this.chefTeamsObservable.next(this.evenlyDistributeTeams(numberOfTeams, chefs))
    })
  }

  evenlyDistributeTeams(numberOfTeams: number, chefs: Chef[]): ChefTeam[] {
    let chefTeams: ChefTeam[] = []
    for (let i = 1; i <= numberOfTeams; i++) {
      chefTeams.push(new ChefTeam(i, []))
    }
 
    // figure out which team currently has the lowest overall score
    // and add the next chef to that team
    // repeat until all chefs have been added to a team
    chefs.forEach(chef => {
      let lowestScoreTeam: ChefTeam = this.findTeamWithLowestScore(chefTeams)
      // add the next chef in the queue to the lowest scoring team
      lowestScoreTeam.chefs.push(chef)
      // recalculate score for the team that just had a chef pushed to it
      lowestScoreTeam.recalculateTeamScore()
    })
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

  clearChefTeams() {
    this.chefTeamsObservable.next([])
  }
}
