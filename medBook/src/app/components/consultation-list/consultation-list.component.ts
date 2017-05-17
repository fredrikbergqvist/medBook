import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ConsultationService} from '../../shared/consultation/consultation.service';
import Consultation from '../../shared/consultation/consultation';

@Component({
    selector :    'app-consultation-list',
    templateUrl : './consultation-list.component.html'
})
export class ConsultationListComponent implements OnChanges {
    @Input() selectedDate;
    public consultations:Array<Consultation> = [];
    public loading = true;
    public consultationsExistForSelectedDate = false;

    constructor(private consultationService:ConsultationService) { }

    ngOnChanges(changes:SimpleChanges):void {
        this.getConsultations();
    }

    private getConsultations() {
        this.loading = true;
        this.consultationService.getConsultations().subscribe(result => {
            const consultationsForSelectedDate = this.consultationService.getConsultationsByDate(result, this.selectedDate);
            if (consultationsForSelectedDate.length) {
                this.consultations = consultationsForSelectedDate;
                this.consultationsExistForSelectedDate = true;
            } else {
                this.consultationsExistForSelectedDate = false;
                this.consultations = result;
            }
            this.loading = false;
        });
    }
}
