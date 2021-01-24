import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChefTeamsService } from 'src/app/services/chef-teams.service';
import { GetChefsService } from 'src/app/services/get-chefs.service';
import { WaitingListService } from 'src/app/services/waiting-list.service';

import { ChefTeamsComponent } from './chef-teams.component';

describe('ChefTeamsComponent', () => {
    let component: ChefTeamsComponent;
    let fixture: ComponentFixture<ChefTeamsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ChefTeamsComponent ],
        imports: [HttpClientModule],
        providers: [
            WaitingListService,
            GetChefsService,
            ChefTeamsService,
            FormBuilder
        ]
      })
      .compileComponents();
    }));
  

    beforeEach(() => {
      fixture = TestBed.createComponent(ChefTeamsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("get meal score", () => {
        let mealScores = [
            {type: "Pizza", rating: "23"}, 
            {type: "Cake", rating: "46"},
            {type: "Risotto", rating: "44"},
            {type: "Baked Potato", rating: "72"}
        ] 
        expect(component.getMealScore("Pizza", mealScores)).toEqual("23")
        expect(component.getMealScore("Cake", mealScores)).toEqual("46")
        expect(component.getMealScore("Risotto", mealScores)).toEqual("44")
        expect(component.getMealScore("Baked Potato", mealScores)).toEqual("72")
        expect(component.getMealScore("Ice Cream", mealScores)).toEqual("")
    })
});
