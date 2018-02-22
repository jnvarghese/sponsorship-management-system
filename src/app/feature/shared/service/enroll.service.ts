import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Enrollment } from '../../model/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EnrollService {

    private sponsorUrl = 'api/enroll';  // URL to web api

    constructor(private http: Http) { }

    save(enrollment: Enrollment): Promise<Enrollment> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(enrollment));
        return this.http
            .post(`${this.sponsorUrl}/enroll`, JSON.stringify(enrollment), { headers: headers })
            .toPromise()
            .then(() => enrollment)
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }    
}
