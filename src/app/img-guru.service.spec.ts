import { TestBed, inject } from '@angular/core/testing';

import { ImgGuruService } from './img-guru.service';

describe('ImgGuruService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgGuruService]
    });
  });

  it('should be created', inject([ImgGuruService], (service: ImgGuruService) => {
    expect(service).toBeTruthy();
  }));
});
