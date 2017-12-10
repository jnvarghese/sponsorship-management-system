import { TestBed, inject } from '@angular/core/testing';

import { sponsorService } from './sponsor.service';

describe('sponsorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [sponsorService]
    });
  });

  it('should be created', inject([sponsorService], (service: sponsorService) => {
    expect(service).toBeTruthy();
  }));
});
