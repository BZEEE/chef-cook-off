import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefWaitingListComponent } from './chef-waiting-list.component';

describe('ChefWaitingListComponent', () => {
  let component: ChefWaitingListComponent;
  let fixture: ComponentFixture<ChefWaitingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefWaitingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
