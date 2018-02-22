import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Initializer, Center } from '../../model/index';

@Injectable()
export class InitService {

    private apiurl = 'api/init';

    constructor(private http: Http) { }

    getCenterList(): Promise<Array<Center>> {
        const initializer = new Initializer();
        return this.http.get(`${this.apiurl}/center`).toPromise()
            .then((response) => {
                return response.json() as Array<Center>;
            })
            .catch(this.handleError);
    }

    getInitializerData(): Promise<Initializer> {
        const initializer = new Initializer();
        return this.http.get(this.apiurl).toPromise()
            .then((response) => {

                return initializer;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
