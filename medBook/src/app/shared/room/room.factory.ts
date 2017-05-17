import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MachineService} from '../machine/machine.service';
import {Room} from './room';

@Injectable()
export class RoomFactory {
    constructor(private machineService:MachineService) {}

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

    createRooms(roomsJson:any) {
        const rooms:Array<Observable<Room>> = [];
        roomsJson.forEach(r => rooms.push(this.createRoom(r)));

        return Observable.create(o => {
            Observable.forkJoin(rooms).subscribe(e => {
                o.next(e);
                o.complete();
            });
        });
    }
}
