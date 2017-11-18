import { TestBed, inject } from '@angular/core/testing';

import { PrenotazioniService } from './prenotazioni.service';

describe('PrenotazioniService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrenotazioniService]
    });
  });

  it('should be created', inject([PrenotazioniService], (service: PrenotazioniService) => {
    expect(service).toBeTruthy();
  }));
});
