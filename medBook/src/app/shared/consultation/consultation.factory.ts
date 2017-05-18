import {Injectable} from '@angular/core';
import Consultation from './consultation';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {PatientService} from '../patient/patient.service';
import {DoctorService} from '../doctor/doctor.service';
import {RoomService} from '../room/room.service';
import {IConsultation} from './iConsultationJson';

@Injectable()
export class ConsultationFactory {
    constructor(private patientService:PatientService,
                private doctorService:DoctorService,
                private roomService:RoomService) {}

    createConsultations(consultationsJson:Array<IConsultation>):Observable<Array<Consultation>> {
        const consultations:Array<Observable<Consultation>> = [];
        consultationsJson.forEach(c => consultations.push(this.createConsultation(c)));

        return Observable.create(o => {
            Observable.forkJoin(consultations).subscribe(e => {
                o.next(e);
                o.complete();
            });
        });
    }

    createConsultation(consultationJson:IConsultation):Observable<Consultation> {
        let observableList:Array<Observable<any>> = [];

        return Observable.create(o => {
            observableList.push(this.patientService.getPatient(consultationJson.patientId));
            observableList.push(this.doctorService.getDoctor(consultationJson.doctorId));
            observableList.push(this.roomService.getRoom(consultationJson.roomId));

            Observable.forkJoin(observableList).subscribe(result => {
                const consultation = new Consultation(
                    this.createDate(consultationJson.registrationDate),
                    result[0],
                    result[1],
                    result[2],
                    this.createDate(consultationJson.consultationDate));
                o.next(consultation);
                o.complete();
            });
        });
    }

    private createDate(date:string):Date {
        if (date) {
            return new Date(date);
        }
        return null;
    }
}
