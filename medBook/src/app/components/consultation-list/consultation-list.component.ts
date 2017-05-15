import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConsultationService} from '../../shared/consultation/consultation.service';
import Consultation from '../../shared/consultation/consultation';

@Component({
    selector :    'app-consultation-list',
    templateUrl : './consultation-list.component.html',
    styleUrls :   ['./consultation-list.component.scss']
})
export class ConsultationListComponent implements OnChanges {
    @Input() selectedDate;
    public consultations:Array<Consultation>;
    public loading = true;

    constructor(public consultationService:ConsultationService) { }

    ngOnChanges(changes:SimpleChanges):void {
        this.getConsultations();
    }

    private getConsultations() {
        this.loading = true;
        this.consultationService.getConsultations(this.selectedDate).subscribe(result => {
            this.consultations = result;
            this.loading = false;
        });
    }
}
