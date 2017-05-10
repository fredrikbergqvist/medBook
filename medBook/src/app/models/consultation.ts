import Patient from './patient';
import {Doctor} from './doctor';
import {Room} from './room';

export default class Consultation {
    constructor(public registrationDate:any, public patient:Patient, public doctor:Doctor, public room:Room, public consultationDate:any) {}
}
