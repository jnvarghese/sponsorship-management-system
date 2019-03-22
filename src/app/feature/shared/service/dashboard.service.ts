import { Enrollment, Dashboard, Initializer, Graph, Receipt } from '../../model/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {

    private apiurl = 'api';

    constructor(private http: HttpClient) { }

    getDashboardInfo() {
      return this.http.get<Initializer>(`${this.apiurl}/dashboard`);
    }

    getEnrollmentByEffectiveDateGraph(){
      return this.http.get<Array<Graph>>(`${this.apiurl}/dashboard/effectivedataset`);
    }

    getEnrollmentByExpirationDateGraph(){
      return this.http.get<Array<Graph>>(`${this.apiurl}/dashboard/exipationdataset`);
    }

    getSponsorsByDemography(by: string){
      return this.http.get<Array<Graph>>(`${this.apiurl}/dashboard/sponsors/${by}`);
    }

    getReceipts(){
      return this.http.get<Array<Receipt>>(`${this.apiurl}/dashboard/receipts`);
    }

    getSponsors(){
      return this.http.get<Array<Graph>>(`${this.apiurl}/dashboard/sponsors`);
    }

    getContributionsAndSponsorCount(){
      return this.http.get<Array<Graph>>(`${this.apiurl}/dashboard/contributionsandsponsorcount`);
    }
}
