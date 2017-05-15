import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';
import {ConsultationFactory} from './consultation.factory';
import Consultation from './consultation';

@Injectable()
export class ConsultationService {

    constructor(public httpService:HttpService, public consultationFactory:ConsultationFactory) { }

    getConsultations(date):Observable<any> {
        const serviceUrl = `http://localhost:8080/consultations`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe((responseData) => {
                    this.consultationFactory.createConsultations(responseData).subscribe(c => {

                        let consultations = this.getConsultationsByDate(c, date);

                        o.next(consultations);
                        o.complete();
                    });
                });
        });
    }

    private getConsultationsByDate(consultations:Array<Consultation>, date:any) {
        return consultations.filter(c => {
            return c.consultationDate.getFullYear() === date.getFullYear() &&
                c.consultationDate.getMonth() === date.getMonth() &&
                c.consultationDate.getDate() === date.getDate();
        });
    }
}
