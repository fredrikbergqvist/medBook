import {Injectable} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs/Observable';
import {Machine} from './machine';
import {MedicalConditionsService} from '../services/medical-conditions.service';

@Injectable()
export class MachineService {
    machineCapabilities = {
        simple :   'simple',
        advanced : 'advanced'
    };

    constructor(private httpService:HttpService,
                private medicalConditionService:MedicalConditionsService) { }

    getMachine(machineId:string):Observable<Machine> {
        if (!machineId) {return Observable.of(null);}

        const serviceUrl = `http://localhost:8080/machines/${machineId}`;

        return this.httpService.get(serviceUrl)
            .map(result => {
                return new Machine(result.id, result.name, result.capability);
            });
    }

    isMachineCapabilityMatchingCondition(condition:string, machine:Machine) {
        if (this.medicalConditionService.medicalConditions.flu === condition) {
            return true;
        }
        if (!machine) {
            return false;
        }

        if (this.medicalConditionService.medicalConditions.headAndNeckCancer === condition) {
            return machine.capability === this.machineCapabilities.advanced;
        }
        if (this.medicalConditionService.medicalConditions.breastCancer === condition) {
            return machine.capability === this.machineCapabilities.advanced ||
                machine.capability === this.machineCapabilities.simple;
        }
        return false;
    }
}
