/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicalConditionsService } from './medical-conditions.service';

describe('MedicalConditionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalConditionsService]
    });
  });

  it('should ...', inject([MedicalConditionsService], (service: MedicalConditionsService) => {
    expect(service).toBeTruthy();
  }));
});
