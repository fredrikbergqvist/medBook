import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Doctor} from './doctor';
import {ImageService} from '../image/image.service';

let mock = {
    registrationDate : new Date(),
    patientId :        '',
    doctorId :         'df765d63-3951-11e7-a03b-332fb645a958',
    roomId :           '',
    consultationDate : new Date()
};

@Injectable()
export class DoctorFactory {
    constructor(public imageService:ImageService) {}

    createDoctor(doctorJson:any):Observable<Doctor> {
        return Observable.create(o => {
            this.imageService.getImage(doctorJson.imageId)
                .subscribe(imageResult => {
                    const doctor = new Doctor(doctorJson.id, doctorJson.name, doctorJson.role, imageResult);
                    o.next(doctor);
                    o.complete();
                });
        });
    }
}
