import { TestBed, inject } from '@angular/core/testing';

import { WathsupService } from './wathsup.service';

describe('WathsupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WathsupService]
    });
  });

  it('should be created', inject([WathsupService], (service: WathsupService) => {
    expect(service).toBeTruthy();
  }));
});
