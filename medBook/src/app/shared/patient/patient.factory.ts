import {Injectable} from '@angular/core';
import Patient from './patient';
import {ImageService} from '../image/image.service';
import {Observable} from 'rxjs/Observable';
import {IPatientJson} from './ipatient-json';

@Injectable()
export class PatientFactory {
    constructor(private imageService:ImageService) {}

    createPatient(patientJson:IPatientJson):Observable<Patient> {
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
