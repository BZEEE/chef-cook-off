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
    return new Promise<any>((resolve, reject) => {
      this.getChefsSvc.getChefs().subscribe(chefs => {
        // we shuffle the order of chefs in order to get randomized teams every time we generate new teams
        this.randomizeChefs(chefs)
        // calculate total number of players required to make all teams have the same number of players
        // eg. if 39 players need to be split into 5 teams, then the most players we can use is 35
        let totalPlayers = chefs.length - (chefs.length % numberOfTeams)
        // evenly distribute kitchen teams and notify all observers of the new teams
        this.chefTeamsObservable.next(this.evenlyDistributeTeams(numberOfTeams, totalPlayers, chefs))
        // get the unassigned chefs and notify all observers of the new waiting list
        this.waitingListService.setWaitingList(this.getUnassignedChefs(totalPlayers, chefs))
        resolve("success")
      },(err) => {
        reject(err)
      })
    })
    
  }

  evenlyDistributeTeams(numberOfTeams: number, totalPlayers: number, chefs: Chef[]): ChefTeam[] {
    let chefTeams: ChefTeam[] = []
    // create the number of chef teams required
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
    // assume the first team in the list has the lowest overall score
    let currentLowestTeam = teams[0]
    teams.forEach(team => {
      // loop through all teams and compare which one has the lowest score, at the end return lowest score team
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

  randomizeChefs(chefs: Chef[]) {
    // to shuffle the array we will use the Fisher-Yates (aka Knuth) un-biased shuffle algorithm.
    // more information can be found about the algorithm here
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = chefs.length
    let temporaryValue
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = chefs[currentIndex];
      chefs[currentIndex] = chefs[randomIndex];
      chefs[randomIndex] = temporaryValue;
    }

    return chefs;
  }

  clearChefTeams() {
    this.chefTeamsObservable.next([])
  }
}
