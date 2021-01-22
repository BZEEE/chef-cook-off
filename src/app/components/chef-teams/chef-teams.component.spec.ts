import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefTeamsComponent } from './chef-teams.component';

describe('ChefTeamsComponent', () => {
  let component: ChefTeamsComponent;
  let fixture: ComponentFixture<ChefTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
