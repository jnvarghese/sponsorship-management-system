import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sponsor } from '../../model/sponsor';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SponsorshipInfo } from '../../model/sponsorship-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SponsorService<T> {

  private sponsorUrl = 'api/sponsors';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getSponsor(): Observable<T[]> {
    return this.http.get<T[]>(this.sponsorUrl);
  }

  search(term: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.sponsorUrl}/?name=${term}`)
      .catch((error: any) => {
          console.error('An friendly error occurred', error);
          return Observable.throw(error.message || error);
      });
  }

  getSponsorShipInfo(id: number): Observable<SponsorshipInfo> {
    return this.http.get<SponsorshipInfo>(`api/sponsorshipDetails/?id=${id}`)
    .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
    });
  }

}
