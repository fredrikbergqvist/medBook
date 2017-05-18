import {Injectable} from '@angular/core';
import {Doctor} from './doctor';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';
import {DoctorFactory} from './doctor.factory';

@Injectable()
export class DoctorService {

    private doctors:Array<Doctor> = [];

    constructor(private httpService:HttpService,
                private doctorFactory:DoctorFactory) { }

    getDoctor(doctorId:string):Observable<Doctor> {
        if (this.doctors.length) {
            const doctor = this.getDoctorFromArray(doctorId);
            if (doctor) {
                return Observable.of(doctor);
            }
        }

        this.cacheListOfDoctors();
        return this.getDoctorFromServer(doctorId);
    }

    private getDoctorFromServer(doctorId) {
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

    private cacheListOfDoctors() {
        this.getDoctorsFromServer();
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

    private getDoctorFromArray(doctorId:string):Doctor {
        let i = 0;
        for (; i < this.doctors.length; i++) {
            if (this.doctors[i].id === doctorId) {
                return this.doctors[i];
            }
        }
        return null;
    }
}
