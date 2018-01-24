import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Enrollment, Dashboard } from '../../model/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DashboardService {

    private apiurl = 'api';  // URL to web api

    constructor(private http: Http) { }

    getDashboardInfo(): Promise<any> {
    return this.http.get(`${this.apiurl}/dashboard`).toPromise()
      .then((response) => {
        return response.json() as any;
      })
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}