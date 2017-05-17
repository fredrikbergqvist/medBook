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
                .subscribe(responseData => {
                    const image = new Image(responseData.id, responseData.url);
                    o.next(image);
                    o.complete();

                });
        });
    }

    public addImage(imageUrl:string):Observable<string> {
        const serviceUrl = `http://localhost:8080/images`;
        const data = {
            url : imageUrl
        };

        return this.httpService.post(data, serviceUrl)
            .map((responseData) => {
                const imageJson = JSON.parse(responseData._body);
                return imageJson.id;
            });
    }
}
