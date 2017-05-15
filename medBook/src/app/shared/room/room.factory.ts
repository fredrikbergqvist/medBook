import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MachineService} from '../machine/machine.service';
import {Room} from './room';

@Injectable()
export class RoomFactory {
    constructor(public machineService:MachineService) {}

    createRoom(roomJson:any):Observable<Room> {
        return Observable.create(o => {
            this.machineService.getMachine(roomJson.treatmentMachineId)
                .subscribe(machineResult => {
                    const room = new Room(roomJson.id, roomJson.name, machineResult);
                    o.next(room);
                    o.complete();
                });
        });
    }
}
