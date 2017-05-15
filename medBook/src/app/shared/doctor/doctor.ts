import Image from '../image/image';
export class Doctor {
    constructor(public id:string, public name:string, public role:Array<string>, public image:Image) {}
}
