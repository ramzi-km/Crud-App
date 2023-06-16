import { TestBed } from '@angular/core/testing';

import { AdminHomeGuardService } from './admin-home-guard.service';

describe('AdminHomeGuardService', () => {
  let service: AdminHomeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHomeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
