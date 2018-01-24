import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Initializer } from '../../model/index';

@Injectable()
export class InitService {
    
    private sponsorUrl = 'api/init';  // URL to web api

    constructor(private http: Http) { }

    /** GET heroes from the server */
    getInitializerData(): Promise<Initializer> {
        let initializer = new Initializer();
        return this.http.get(this.sponsorUrl).toPromise()
            .then((response) => {
                initializer.projects =  response.json()[0];
                initializer.parishes =  response.json()[1];
                initializer.agencies =  response.json()[2];
                return initializer;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}