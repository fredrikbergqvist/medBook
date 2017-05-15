import {Injectable} from '@angular/core';
import Patient from './patient';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs/Observable';
import {PatientFactory} from './patient.factory';
import {MedicalCondition} from '../../enums/medical-condition';

@Injectable()
export class PatientService {

    constructor(public httpService:HttpService, public patientFactory:PatientFactory) { }

    getPatient(id:string):Observable<Patient> {

        return Observable.of(new Patient('patientId', 'Patient Name', MedicalCondition.flu, null));
/*
        const serviceUrl = '/patients';

        return this.httpService.get(serviceUrl)
            .map((responseData) => {
                const patient = this.patientFactory.createPatient(responseData);
                return patient;
            });
            */
    }

    addPatient(patient:Patient):void {}

}
