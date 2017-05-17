import {Injectable} from '@angular/core';

@Injectable()
export class SpecialistRoleService {

    public specialistRole = {
        oncologist : 'Oncologist',
        generalist : 'GeneralPractitioner'
    };


    constructor() { }

}
