import {Injectable} from '@angular/core';
import {Doctor} from './doctor';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';
import {DoctorFactory} from './doctor.factory';
import {SpecialistRoleService} from '../services/specialist-role.service';
import {MedicalConditionsService} from '../services/medical-conditions.service';

@Injectable()
export class DoctorService {

    private doctors:Array<Doctor> = [];

    constructor(private httpService:HttpService,
                private doctorFactory:DoctorFactory,
                private roleService:SpecialistRoleService,
                private conditionService:MedicalConditionsService) { }

    getDoctor(doctorId:string):Observable<Doctor> {
        if (this.doctors.length) {
            const doctor = this.getDoctorFromArray(doctorId);
            if (doctor) {
                return Observable.of(doctor);
            }
        }

        const serviceUrl = `http://localhost:8080/doctors/${doctorId}`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe(result => {
                    this.doctorFactory.createDoctor(result)
                        .subscribe(dr => {
                            o.next(dr);
                            o.complete();
                        });
                });
        });
    }

    getDoctors(condition:string) {
        if (this.doctors.length) {
            const doctorsSpecializedInCondition = this.getDoctorByCondition(condition, this.doctors);
            return Observable.of(doctorsSpecializedInCondition);
        }

        return Observable.create(o => {
            this.getDoctorsFromServer()
                .subscribe(drs => {
                    const doctorsSpecializedInCondition = this.getDoctorByCondition(condition, drs);
                    o.next(doctorsSpecializedInCondition);
                    o.complete();
                });
        });
    }

    private getDoctorsFromServer() {
        const serviceUrl = 'http://localhost:8080/doctors';

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe(result => {
                    this.doctorFactory.createDoctors(result)
                        .subscribe(drs => {
                            this.doctors = drs;
                            o.next(drs);
                            o.complete();
                        });
                });
        });

    }

    private getDoctorByCondition(selectedCondition:string, doctors:Array<Doctor>):Array<Doctor> {
        let specializedDoctors = [];
        doctors.forEach(dr => {
            const specialization:string = this.getSpecializationForCondition(selectedCondition);
            if (this.doctorHasSpecialization(dr.role, specialization)) {
                specializedDoctors.push(dr);
            }
        });
        return specializedDoctors;
    }

    private doctorHasSpecialization(roles:Array<string>, specialization:string) {
        if (!roles || !roles.length) {
            return false;
        }

        let i = 0;
        for (; i < roles.length; i++) {
            if (roles[i] === specialization) {
                return true;
            }
        }
    }

    private getSpecializationForCondition(selectedCondition:string):string {
        switch (selectedCondition) {
            case this.conditionService.medicalConditions.breastCancer:
                return this.roleService.specialistRole.oncologist;
            case this.conditionService.medicalConditions.headAndNeckCancer:
                return this.roleService.specialistRole.oncologist;
            case this.conditionService.medicalConditions.flu:
                return this.roleService.specialistRole.generalist;
            default:
                return '';
        }
    }

    private getDoctorFromArray(doctorId:string):Doctor {
        let i = 0;
        for (; i < this.doctors.length; i++) {
            if (this.doctors[i].id === doctorId) {
                return this.doctors[i];
            }
        }
    }
}
