import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Room} from './room';
import {RoomFactory} from './room.factory';
import {HttpService} from '../services/http.service';

@Injectable()
export class RoomService {
    private rooms:Array<Room> = [];

    constructor(private httpService:HttpService,
                private roomFactory:RoomFactory) { }

    getRoom(roomId:string):Observable<Room> {
        if (this.rooms.length) {
            return Observable.of(this.getRoomFromArray(roomId));
        }
        const serviceUrl = `http://localhost:8080/rooms/${roomId}`;
        return Observable.create(o => {
            this.httpService.get(serviceUrl).subscribe(result => {
                this.roomFactory.createRoom(result).subscribe(r => {
                    o.next(r);
                    o.complete();
                });
                this.getRoomsFromServer();
            });
        });
    }

    private getRoomsFromServer():Observable<Array<Room>> {
        const serviceUrl = `http://localhost:8080/rooms`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl).subscribe(result => {
                this.roomFactory.createRooms(result).subscribe(r => {
                    this.rooms = r;
                    o.next(r);
                    o.complete();
                });
            });
        });
    }

    private getRoomFromArray(roomId):Room {
        let i = 0;
        for (; i < this.rooms.length; i++) {
            if (this.rooms[i].id === roomId) {
                return this.rooms[i];
            }
        }
    }
}
