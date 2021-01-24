import { Chef } from "./chef"


export class ChefTeam {
    totalTeamScore: number
    averageRisottoScore: number
    averagePizzaScore: number
    averageCakeScore: number
    averageBakedPotatoScore: number
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

        // re-calculate average scores for all dishes
        this.recalculateRisottoScore()
        this.recalculatePizzaScore()
        this.recalculateCakeScore()
        this.recalculateBakedPotatoScore()
    }

    recalculateRisottoScore() {
        // recalculate the total team's score based on every
        // chef's meal ratings within the team 
        this.averageRisottoScore = 0
        this.chefs.forEach(chef => {
            let mealScore = chef.abilities.find(ability => ability["type"] === "Risotto")
            this.averageRisottoScore += mealScore["rating"]
        })
        this.averageRisottoScore = Number((this.averageRisottoScore / this.chefs.length).toFixed(1))
    }

    recalculatePizzaScore() {
        // recalculate the total team's score based on every
        // chef's meal ratings within the team 
        this.averagePizzaScore = 0
        this.chefs.forEach(chef => {
            let mealScore = chef.abilities.find(ability => ability["type"] === "Pizza")
            this.averagePizzaScore += mealScore["rating"]
        })
        this.averagePizzaScore = Number((this.averagePizzaScore / this.chefs.length).toFixed(1))
    }

    recalculateCakeScore() {
        // recalculate the total team's score based on every
        // chef's meal ratings within the team 
        this.averageCakeScore = 0
        this.chefs.forEach(chef => {
            let mealScore = chef.abilities.find(ability => ability["type"] === "Cake")
            this.averageCakeScore += mealScore["rating"]
        })
        this.averageCakeScore = Number((this.averageCakeScore / this.chefs.length).toFixed(1))
    }

    recalculateBakedPotatoScore() {
        // recalculate the total team's score based on every
        // chef's meal ratings within the team 
        this.averageBakedPotatoScore = 0
        this.chefs.forEach(chef => {
            let mealScore = chef.abilities.find(ability => ability["type"] === "Baked Potato")
            this.averageBakedPotatoScore += mealScore["rating"]
        })
        this.averageBakedPotatoScore = Number((this.averageBakedPotatoScore / this.chefs.length).toFixed(1))
    }
}