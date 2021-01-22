import { TestBed } from '@angular/core/testing';

import { ChefTeamsService } from './chef-teams.service';

describe('ChefTeamsService', () => {
  let service: ChefTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
