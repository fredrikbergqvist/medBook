import {Injectable} from '@angular/core';
import Image from './image';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';

@Injectable()
export class ImageService {

    constructor(public httpService:HttpService) { }

    public getImage(imageId:string):Observable<Image> {
        const serviceUrl = `http://localhost:8080/images/${imageId}`;

        return Observable.create(o => {
            this.httpService.get(serviceUrl)
                .map((responseData) => {
                    return new Image(responseData.id, responseData.url);
                }).subscribe(result => {
                o.next(result);
                o.complete();
            });
        });
    }

    public getImages():Array<Image> {
        return [];
    }

}
