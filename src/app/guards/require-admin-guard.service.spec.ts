import { TestBed, inject } from '@angular/core/testing';

import { RequireAdminGuardService } from './require-admin-guard.service';

describe('RequireAdminGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireAdminGuardService]
    });
  });

  it('should be created', inject([RequireAdminGuardService], (service: RequireAdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
