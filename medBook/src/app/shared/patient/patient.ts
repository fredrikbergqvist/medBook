import Image from '../image/image';

export default class Patient {
    constructor(public id:string, public name:string, public condition:string, public image:Image) {}
}
