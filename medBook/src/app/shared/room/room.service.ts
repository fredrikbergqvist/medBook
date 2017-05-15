import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Room} from './room';
import {RoomFactory} from './room.factory';
import {HttpService} from '../services/http.service';

@Injectable()
export class RoomService {

    constructor(public httpService:HttpService,public roomFactory:RoomFactory) { }

    getRoom(roomId:string):Observable<Room> {
        if (!roomId) {Observable.of(null);}

        const serviceUrl = `http://localhost:8080/rooms/${roomId}`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .subscribe(result => {
                    this.roomFactory.createRoom(result)
                        .subscribe(dr => {
                            o.next(dr);
                            o.complete();
                        });
                });
        });
    }
}
