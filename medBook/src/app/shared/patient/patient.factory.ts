import {Injectable} from '@angular/core';
import Patient from './patient';
import {ImageService} from '../image/image.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PatientFactory {
    constructor(private imageService:ImageService) {}

    createPatient(patientJson:any):Observable<Patient> {
        const patient = new Patient(
            patientJson.id,
            patientJson.name,
            patientJson.condition,
            null);
        return Observable.create(o => {
            if (patientJson.imageId) {
                this.imageService.getImage(patientJson.imageId).subscribe(img => {
                    patient.image = img;
                    o.next(patient);
                    o.complete();
                });
            } else {
                o.next(patient);
                o.complete();
            }
        });
    }
}
