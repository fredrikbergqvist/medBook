import {Observable} from 'rxjs/Observable';
import {SpyObject} from '../../test/test.helper';
import {DoctorFactory} from './doctor.factory';

export class MockDoctorFactory extends SpyObject {
    fakeResponse;
    createDoctorSpy;
    createDoctorsSpy;

    constructor() {
        super(DoctorFactory);
        this.fakeResponse = [{}];
        this.createDoctorSpy = this.spy('createDoctor').andReturn(
            Observable.create(observer => {
                observer.next(this.fakeResponse);
                observer.complete();
            }));

        this.createDoctorsSpy = this.spy('createDoctors').andReturn(
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
        return [{provide : DoctorFactory, useClass : MockDoctorFactory}];
    }
}
