import { TestBed, inject } from '@angular/core/testing';

import { OnlyLoggedInUsersGuardService } from './only-logged-in-users-guard.service';

describe('OnlyLoggedInUsersGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedInUsersGuardService]
    });
  });

  it('should be created', inject([OnlyLoggedInUsersGuardService], (service: OnlyLoggedInUsersGuardService) => {
    expect(service).toBeTruthy();
  }));
});
