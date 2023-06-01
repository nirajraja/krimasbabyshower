import { TestBed } from '@angular/core/testing';

import { RsvpServiceService } from './rsvp-service.service';

describe('RsvpServiceService', () => {
  let service: RsvpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsvpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
