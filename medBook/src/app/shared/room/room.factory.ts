import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MachineService} from '../machine/machine.service';
import {Room} from './room';
import {IRoomJson} from './iroom-json';

@Injectable()
export class RoomFactory {
    constructor(private machineService:MachineService) {}

    createRoom(roomJson:IRoomJson):Observable<Room> {
        return Observable.create(o => {
            this.machineService.getMachine(roomJson.treatmentMachineId)
                .subscribe(machineResult => {
                    const room = new Room(roomJson.id, roomJson.name, machineResult);
                    o.next(room);
                    o.complete();
                });
        });
    }

    createRooms(roomsJson:Array<IRoomJson>) {
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
