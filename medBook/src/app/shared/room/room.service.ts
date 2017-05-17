import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Room} from './room';
import {RoomFactory} from './room.factory';
import {HttpService} from '../services/http.service';
import {MedicalConditionsService} from '../services/medical-conditions.service';
import {MachineService} from '../machine/machine.service';

@Injectable()
export class RoomService {
    private rooms:Array<Room> = [];

    constructor(private httpService:HttpService,
                private roomFactory:RoomFactory,
                private conditionService:MedicalConditionsService,
                private machineService:MachineService) { }

    getRoom(roomId:string):Observable<Room> {
        if (!roomId) {Observable.of(null);}

        const serviceUrl = `http://localhost:8080/rooms/${roomId}`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe(result => {
                    this.roomFactory.createRoom(result)
                        .subscribe(r => {
                            o.next(r);
                            o.complete();
                        });
                });
        });
    }

    getRooms(condition:string):Observable<Array<Room>> {
        if (this.rooms.length) {
            const roomsFulfillingCondition = this.getRoomsByCondition(condition, this.rooms);
            return Observable.of(roomsFulfillingCondition);
        }

        return Observable.create(o => {
            this.getRoomsFromServer().subscribe(r => {
                const roomsFulfillingCondition = this.getRoomsByCondition(condition, r);

                o.next(roomsFulfillingCondition);
                o.complete();
            });
        });
    }

    private getRoomsFromServer():Observable<Array<Room>> {
        if (this.rooms.length) {
            return Observable.of(this.rooms);
        }

        const serviceUrl = `http://localhost:8080/rooms`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe(result => {
                    this.roomFactory.createRooms(result)
                        .subscribe(r => {
                            this.rooms = r;
                            o.next(r);
                            o.complete();
                        });
                });
        });

    }

    private getRoomsByCondition(condition:string, rooms:Array<Room>):Array<Room> {
        const matchingRooms:Array<Room> = [];
        if (condition === this.conditionService.medicalConditions.flu) {
            return rooms;
        }
        rooms.forEach(room => {
            if (this.machineService.isMachineCapabilityMatchingCondition(condition, room.treatmentMachine)) {
                matchingRooms.push(room);
            }
        });
        return matchingRooms;
    }
}
