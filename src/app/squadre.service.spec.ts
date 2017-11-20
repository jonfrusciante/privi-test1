import { TestBed, inject } from '@angular/core/testing';

import { SquadreService } from './squadre.service';

describe('SquadreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SquadreService]
    });
  });

  it('should be created', inject([SquadreService], (service: SquadreService) => {
    expect(service).toBeTruthy();
  }));
});
