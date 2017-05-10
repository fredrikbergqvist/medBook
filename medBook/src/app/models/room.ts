import {Machine} from './machine';
export class Room {
    constructor(public id:string, public name:string, public treatmentMachine:Machine) {}
}
