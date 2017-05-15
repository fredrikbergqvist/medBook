import {Injectable} from '@angular/core';
import Patient from './patient';
import {ImageService} from '../image/image.service';

@Injectable()
export class PatientFactory {
    constructor(public imageService:ImageService) {}

    createPatient(patientJson:any):Patient {
        const patient = new Patient(
            patientJson.id,
            patientJson.name,
            patientJson.condition,
            null
            /*this.imageService.getImage(patientJson.imageId)*/
        );
        return patient;
    }
}
