import { Chef } from "./chef"


export class ChefTeam {
    totalTeamScore: number
    teamNumber: number
    chefs: Chef[]

    constructor(teamNumber: number, chefs: Chef[]) {
        this.teamNumber = teamNumber
        this.chefs = chefs
        this.recalculateTeamScore()
    }

    recalculateTeamScore() {
        // recalculate the total team's score based on every
        // chef's meal ratings within the team 
        this.totalTeamScore = 0
        this.chefs.forEach(chef => {
            chef.abilities.forEach(mealScore => {
                this.totalTeamScore += mealScore["rating"]
            })
        })
    }
}