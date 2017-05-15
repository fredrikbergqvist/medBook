/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MachineService } from './machine.service';

describe('MachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineService]
    });
  });

  it('should ...', inject([MachineService], (service: MachineService) => {
    expect(service).toBeTruthy();
  }));
});
