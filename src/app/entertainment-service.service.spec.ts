import { TestBed } from '@angular/core/testing';

import { EntertainmentServiceService } from './entertainment-service.service';

describe('EntertainmentServiceService', () => {
  let service: EntertainmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntertainmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
