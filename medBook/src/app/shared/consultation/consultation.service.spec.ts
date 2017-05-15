/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultationService } from './consultation.service';

describe('ConsultationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultationService]
    });
  });

  it('should ...', inject([ConsultationService], (service: ConsultationService) => {
    expect(service).toBeTruthy();
  }));
});
