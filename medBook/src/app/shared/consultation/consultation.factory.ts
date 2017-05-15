import {Injectable} from '@angular/core';
import Consultation from './consultation';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {PatientService} from '../patient/patient.service';
import {DoctorService} from '../doctor/doctor.service';
import {RoomService} from '../room/room.service';

let mock = {
    registrationDate : new Date(),
    patientId :        '',
    doctorId :         'df765d63-3951-11e7-a03b-332fb645a958',
    roomId :           'df765d6b-3951-11e7-a03b-332fb645a958',
    consultationDate : new Date()
};
let mock2 = {
    registrationDate : new Date('2017-05-14'),
    patientId :        '',
    doctorId :         'df765d64-3951-11e7-a03b-332fb645a958',
    roomId :           'df765d6b-3951-11e7-a03b-332fb645a958',
    consultationDate : new Date('2017-05-14')
};

@Injectable()
export class ConsultationFactory {
    constructor(public patientService:PatientService, public doctorService:DoctorService, public roomService:RoomService) {}

    createConsultations(consultationsJson:Array<any>):Observable<Array<Consultation>> {
        consultationsJson = [mock, mock2, mock];
        const consultations:Array<Observable<Consultation>> = [];
        consultationsJson.forEach(c => consultations.push(this.createConsultation(c)));

        return Observable.create(o => {
            Observable.forkJoin(consultations).subscribe(e => {
                o.next(e);
                o.complete();
            });
        });
    }

    createConsultation(consultationJson:any):Observable<Consultation> {
        let observableList:Array<Observable<any>> = [];

        return Observable.create(o => {
            observableList.push(this.patientService.getPatient(consultationJson.patientId));
            observableList.push(this.doctorService.getDoctor(consultationJson.doctorId));
            observableList.push(this.roomService.getRoom(consultationJson.roomId));

            Observable.forkJoin(observableList).subscribe(result => {
                const consultation = new Consultation(
                    consultationJson.registrationDate,
                    result[0],
                    result[1],
                    result[2],
                    consultationJson.consultationDate);
                o.next(consultation);
                o.complete();
            });
        });
    }
}
