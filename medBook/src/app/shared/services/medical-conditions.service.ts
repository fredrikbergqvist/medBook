import {Injectable} from '@angular/core';

@Injectable()
export class MedicalConditionsService {
    medicalConditions = {
        breastCancer :      'breastcancer',
        headAndNeckCancer : 'headandneckcancer',
        flu :               'flu'
    };
    constructor() { }

    public getMedicalConditionsAsArray():Array<string> {
        let conditions:Array<string> = [];

        Object.keys(this.medicalConditions).forEach((key) => {
            conditions.push(this.medicalConditions[key]);
        });

        return conditions;
    }

}
