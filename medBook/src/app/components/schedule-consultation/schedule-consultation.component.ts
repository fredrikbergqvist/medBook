import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MedicalConditionsService} from '../../shared/services/medical-conditions.service';
import * as webdriver from 'selenium-webdriver';
import {PatientService} from '../../shared/patient/patient.service';
import Condition = webdriver.until.Condition;

@Component({
    selector :    'app-schedule-consultation',
    templateUrl : './schedule-consultation.component.html'
})
export class ScheduleConsultationComponent implements OnInit {
    @Output() onPatientAdded:EventEmitter<string> = new EventEmitter();
    public conditions:Array<string> = [];
    public model = {
        patientName :       '',
        patientUrl :        '',
        selectedCondition : ''
    };
    public loading = false;

    constructor(private conditionsService:MedicalConditionsService,
                private patientService:PatientService) {
    }

    ngOnInit() {
        this.conditions = this.conditionsService.getMedicalConditionsAsArray();
    }

    onSubmit() {
        this.loading = true;
        this.patientService.addPatient(this.model.patientName, this.model.patientUrl, this.model.selectedCondition).subscribe(patientId => {
            this.loading = false;
            this.onPatientAdded.emit(patientId);
        });
    }

    onBackClick() {
        this.onPatientAdded.emit(null);
    }

}
