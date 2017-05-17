import {Injectable} from '@angular/core';
import Image from './image';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';

@Injectable()
export class ImageService {

    constructor(private httpService:HttpService) { }

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

    addImage(imageUrl:string):Observable<string> {
        const serviceUrl = `http://localhost:8080/images`;
        const data = {
            url : imageUrl
        };

        return this.httpService.post(data, serviceUrl)
            .map((responseData) => {
                const imageJson = JSON.parse(responseData._body);
                console.log('image service', imageJson);
                return imageJson.id;
            });
    }
}
