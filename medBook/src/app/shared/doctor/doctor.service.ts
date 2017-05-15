import {Injectable} from '@angular/core';
import {Doctor} from './doctor';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';
import {DoctorFactory} from './doctor.factory';

@Injectable()
export class DoctorService {

    constructor(public httpService:HttpService, public doctorFactory:DoctorFactory) { }

    getDoctor(doctorId:string):Observable<Doctor> {
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
}
