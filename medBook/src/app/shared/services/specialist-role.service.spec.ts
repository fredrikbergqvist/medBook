/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpecialistRoleService } from './specialist-role.service';

describe('SpecialistRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialistRoleService]
    });
  });

  it('should ...', inject([SpecialistRoleService], (service: SpecialistRoleService) => {
    expect(service).toBeTruthy();
  }));
});
