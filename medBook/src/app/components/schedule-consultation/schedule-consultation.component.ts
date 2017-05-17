import {Component, OnInit} from '@angular/core';
import {MedicalConditionsService} from '../../shared/services/medical-conditions.service';
import {DoctorService} from '../../shared/doctor/doctor.service';
import {RoomService} from '../../shared/room/room.service';
import Consultation from '../../shared/consultation/consultation';
import {Room} from '../../shared/room/room';
import {Doctor} from '../../shared/doctor/doctor';
import * as webdriver from 'selenium-webdriver';
import {ConsultationService} from '../../shared/consultation/consultation.service';
import {PatientService} from '../../shared/patient/patient.service';
import Condition = webdriver.until.Condition;

@Component({
    selector :    'app-schedule-consultation',
    templateUrl : './schedule-consultation.component.html',
    styleUrls :   ['./schedule-consultation.component.scss']
})
export class ScheduleConsultationComponent implements OnInit {
    public conditions:Array<string> = [];
    public doctors:Array<Doctor> = [];
    public rooms:Array<Room> = [];
    public consultations:Array<Consultation> = [];
    public model = {
        patientName :       '',
        patientUrl :        '',
        selectedCondition : '',
        selectedDate :      new Date(),
        selectedDoctor :    null,
        selectedRoom :      null
    };
    public loading = false;

    constructor(private conditionsService:MedicalConditionsService,
                private doctorService:DoctorService,
                private roomService:RoomService,
                private consultationService:ConsultationService,
                private patientService:PatientService) {
    }

    ngOnInit() {
        this.conditions = this.conditionsService.getMedicalConditionsAsArray();
        this.getConsultations();
    }

    onDateChange(event:any) {
        this.model.selectedDate = new Date(event);
        this.getConsultations();
    }

    onConditionChange(event:any) {
        this.doctorService.getDoctors(this.model.selectedCondition).subscribe(drs => {
            this.doctors = drs;
        });
        this.roomService.getRooms(this.model.selectedCondition).subscribe(r => {
            this.rooms = r;
        });
    }

    onSubmit() {
        this.loading = true;
        this.patientService.addPatient(this.model.patientName, this.model.patientUrl, this.model.selectedCondition).subscribe(patientId => {
            this.loading = false;
            console.log('Patient added!');
        });
        console.log('submit!');
    }

    private getConsultations() {
        this.consultationService.getConsultations(this.model.selectedDate).subscribe(c => {
            this.consultations = c;
        });
    }

}
