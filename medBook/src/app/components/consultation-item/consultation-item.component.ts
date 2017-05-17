import {Component, Input} from '@angular/core';
import Consultation from '../../shared/consultation/consultation';

@Component({
    selector :    'app-consultation-item',
    templateUrl : './consultation-item.component.html'
})
export class ConsultationItemComponent {
    @Input() consultation:Consultation;

    public detailsHidden = true;

    constructor() { }

    public toggleShowDetails() {
        this.detailsHidden = !this.detailsHidden;
    }
}
