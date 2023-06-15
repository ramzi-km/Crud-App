import { TestBed } from '@angular/core/testing';

import { UserHomeGuardService } from './user-home-guard.service';

describe('UserHomeGuardService', () => {
  let service: UserHomeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHomeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
