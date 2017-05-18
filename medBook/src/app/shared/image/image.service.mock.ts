import {Observable} from 'rxjs/Observable';
import {SpyObject} from '../../test/test.helper';
import {ImageService} from './image.service';


export class MockImageService extends SpyObject {
    fakeResponse;
    addImageSpy;
    getImageSpy;

    constructor() {
        super(ImageService);
        this.fakeResponse = [{}];
        this.addImageSpy = this.spy('createDoctor').andReturn(
            Observable.create(observer => {
                observer.next(this.fakeResponse);
                observer.complete();
            }));

        this.getImageSpy = this.spy('createDoctors').andReturn(
            Observable.create(observer => {
                observer.next(this.fakeResponse);
                observer.complete();
            }));
    }

    subscribe(callback) {
        callback(this.fakeResponse);
    }

    setResponse(json:any):void {
        this.fakeResponse = json;
    }

    getProviders():Array<any> {
        return [{provide : ImageService, useClass : MockImageService}];
    }
}
