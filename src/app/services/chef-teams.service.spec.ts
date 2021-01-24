import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ChefTeamsService } from './chef-teams.service';
import { GetChefsService } from './get-chefs.service';
import { WaitingListService } from './waiting-list.service';

describe('ChefTeamsService', () => {
  let service: ChefTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GetChefsService,
        WaitingListService
      ]
    });
    service = TestBed.inject(ChefTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
