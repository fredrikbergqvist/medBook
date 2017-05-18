import {Component} from '@angular/core';

@Component({
    selector :    'app-root',
    templateUrl : './app.component.html',
    styleUrls :   ['./app.component.scss']
})
export class AppComponent {
    public selectedDate = new Date();
    public showConsultationList = true;

    public dateChanged(date) {
        this.selectedDate = !date
            ? new Date()
            : new Date(date);
    }

    public addPatientClick() {
        this.showConsultationList = false;
    }

    public patientAdded() {
        this.showConsultationList = true;
    }

    public backClick() {
        this.showConsultationList = true;
    }
}
