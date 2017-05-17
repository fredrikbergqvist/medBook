import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs/Observable';
import {Machine} from './machine';

@Injectable()
export class MachineService {
    machineCapabilities = {
        simple :   'simple',
        advanced : 'advanced'
    };

    constructor(private httpService:HttpService) { }

    getMachine(machineId:string):Observable<Machine> {
        if (!machineId) {return Observable.of(null);}

        const serviceUrl = `http://localhost:8080/machines/${machineId}`;
        return this.httpService.get(serviceUrl)
            .map(result => {
                return new Machine(result.id, result.name, result.capability);
            });
    }

}
