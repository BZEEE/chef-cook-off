import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChefTeamsService } from 'src/app/services/chef-teams.service';
import { GetChefsService } from 'src/app/services/get-chefs.service';
import { WaitingListService } from 'src/app/services/waiting-list.service';

import { ChefTeamsComponent } from './chef-teams.component';

describe('ChefTeamsComponent', () => {
  let component: ChefTeamsComponent;
  let fixture: ComponentFixture<ChefTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WaitingListService,
        GetChefsService,
        ChefTeamsService,
        FormBuilder,],
      declarations: [ ChefTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
