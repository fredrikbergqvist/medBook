import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {SpyObject} from '../../test/test.helper';
export class MockHttpService extends SpyObject {
    fakeResponse;
    getSpy;
    postSpy;

    constructor() {
        super(HttpService);
        this.fakeResponse = [{}];
        this.getSpy = this.spy('get').andReturn(
            Observable.create(observer => {
                observer.next(this.fakeResponse);
                observer.complete();
            }));

        this.postSpy = this.spy('post').andReturn(
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
        return [{provide : HttpService, useValue : this}];
    }
}
