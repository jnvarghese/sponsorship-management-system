import { Enrollment, Dashboard, Initializer } from '../../model/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {

    private apiurl = 'api';

    constructor(private http: HttpClient) { }

    getDashboardInfo() {
      return this.http.get<Initializer>(`${this.apiurl}/dashboard`);
    }

}
