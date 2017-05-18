/* tslint:disable:no-unused-variable */

import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {DoctorService} from './doctor.service';
import {Doctor} from './doctor';
import {MockHttpService} from '../services/http.service.mock';
import {MockDoctorFactory} from './doctor.factory.mock';

let mockHttpService;
let mockDoctorFactory;

const doctors = [
    new Doctor('1', '', [], null),
    new Doctor('2', '', [], null),
    new Doctor('3', '', [], null),
    new Doctor('4', '', [], null)
];

describe('DoctorService', () => {
    beforeEach(() => {
        mockHttpService = new MockHttpService();
        mockDoctorFactory = new MockDoctorFactory();

        TestBed.configureTestingModule({
            providers : [
                mockHttpService.getProviders(),
                mockDoctorFactory.getProviders(),
                DoctorService
            ]
        });
    });

    it('should ork', inject([DoctorService], (service:DoctorService) => {
        expect(service).toBeTruthy();
    }));

    describe('getDoctor', () => {
        it('should use cache if possible',
            inject([DoctorService], fakeAsync((service:DoctorService) => {
                service['doctors'] = doctors;
                service.getDoctor('1');
                tick();
                expect(mockHttpService.getSpy).not.toHaveBeenCalled();
            })));

        it('should get the correct object from the cache',
            inject([DoctorService], fakeAsync((service:DoctorService) => {
                let doctor, doctor2;
                service['doctors'] = doctors;
                service.getDoctor('3').subscribe(dr => {
                    doctor = dr;
                });
                service.getDoctor('4').subscribe(dr => {
                    doctor2 = dr;
                });
                tick();
                expect(doctor.id).toBe('3');
                expect(doctor2.id).toBe('4');
            })));
        it('should query server if no object is found in cache',
            inject([DoctorService], fakeAsync((service:DoctorService) => {
                let doctor;
                service['doctors'] = doctors;
                service.getDoctor('0').subscribe(dr => {
                    doctor = dr;
                });
                tick();
                expect(mockHttpService.getSpy).toHaveBeenCalled();
            })));
    });

});
