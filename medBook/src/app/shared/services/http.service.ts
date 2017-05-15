import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    constructor(private http:Http) {

    }

    /**
     * Used instead of Http.get so headers are added every time. Arguments can be overruled.
     * @param apiUrl URL to service call
     * @param args RequestOptionsArgs to the http call
     * @return Observable<json>
     */
    get(apiUrl:string, args?:any):Observable<any> {
        if (!args) {
            const headers = new Headers();
            headers.append('X-Requested-With', 'XMLHttpRequest');
            args = {
                headers : headers
            };
        }

        return this.http.get(apiUrl, args)
            .map((responseData) => {
                return responseData.json();
            });
    }

    /**
     * Used instead of Http.post so headers are added every time.
     * @param post Post Object to post to server
     * @param apiUrl URL to service call
     * @param args RequestOptionsArgs to the http call
     * @return Response data
     */
    post(postData:Object, apiUrl:string, args?:any) {
        if (!args) {
            const headers = new Headers({
                'Content-Type' :     'application/json',
                'X-Requested-With' : 'XMLHttpRequest'
            });

            args = {
                headers : headers
            };
        }

        return this.http.post(apiUrl, JSON.stringify(postData), args)
            .map((responseData) => {
                return responseData;
            });
    }

    uploadFile(formData, serviceUrl:string):Promise<any> {
        return new Promise((resolve, reject) => {
            let xhr:XMLHttpRequest = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        console.error('Error when uploading file');
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', serviceUrl, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(formData);
        });
    }
}
