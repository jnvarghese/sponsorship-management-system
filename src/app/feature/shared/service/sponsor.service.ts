import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sponsor } from '../../model/sponsor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SponsorService {

  private sponsorUrl = 'api/sponsors';  // URL to web api

  constructor( private http: HttpClient) { }

  /** GET heroes from the server */
  getsponsor (): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.sponsorUrl);
  }
}
