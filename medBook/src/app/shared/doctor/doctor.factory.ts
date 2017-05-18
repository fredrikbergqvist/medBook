import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Doctor} from './doctor';
import {ImageService} from '../image/image.service';
import {IDoctorJson} from './iDoctor';

@Injectable()
export class DoctorFactory {
    constructor(private imageService:ImageService) {}

    createDoctor(doctorJson:IDoctorJson):Observable<Doctor> {
        return Observable.create(o => {
            this.imageService.getImage(doctorJson.imageId)
                .subscribe(imageResult => {
                    const doctor = new Doctor(doctorJson.id, doctorJson.name, doctorJson.roles, imageResult);
                    o.next(doctor);
                    o.complete();
                });
        });
    }

    createDoctors(doctorsJson:Array<IDoctorJson>):Observable<Array<Doctor>> {
        const doctors:Array<Observable<Doctor>> = [];
        doctorsJson.forEach(dr => doctors.push(this.createDoctor(dr)));

        return Observable.create(o => {
            Observable.forkJoin(doctors).subscribe(e => {
                o.next(e);
                o.complete();
            });
        });
    }
}
