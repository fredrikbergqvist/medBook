import Patient from '../patient/patient';
import {Doctor} from '../doctor/doctor';
import {Room} from '../room/room';

export default class Consultation {
    constructor(public registrationDate:any,
                public patient:Patient,
                public doctor:Doctor,
                public room:Room,
                public consultationDate:any) {}
}
