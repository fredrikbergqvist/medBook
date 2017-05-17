import {Injectable} from '@angular/core';
import Patient from './patient';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs/Observable';
import {PatientFactory} from './patient.factory';
import {ImageService} from '../image/image.service';

@Injectable()
export class PatientService {

    constructor(private httpService:HttpService,
                private patientFactory:PatientFactory,
                private imageService:ImageService) { }

    getPatient(id:string):Observable<Patient> {

        const serviceUrl = `http://localhost:8080/patients/${id}`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe((responseData) => {
                    this.patientFactory.createPatient(responseData).subscribe(p => {
                        o.next(p);
                        o.complete();
                    });
                });
        });
    }

    addPatient(name:string, imageUrl:string, condition:string):Observable<string> {
        if (!imageUrl) {
            return this.postPatientToServer(name, condition, null);
        }

        return Observable.create(o => {
            this.imageService.addImage(imageUrl).subscribe(imageId => {
                this.postPatientToServer(name, condition, imageId).subscribe(patientId => {
                    o.next(patientId);
                    o.complete();
                });
            });
        });
    }

    private postPatientToServer(name:string, condition:string, imageId:string):Observable<string> {
        const serviceUrl = `http://localhost:8080/patients`;
        const data = {
            name :      name,
            condition : condition,
            imageId :   imageId
        };

        return this.httpService.post(data, serviceUrl)
            .map((responseData:any) => {
                const patientJson = JSON.parse(responseData._body);
                return patientJson.id;
            });
    }

}
