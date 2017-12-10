import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { sponsor } from '../../model/sponsor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class sponsorService {

  private sponsorUrl = 'api/sponsors';  // URL to web api

  constructor( private http: HttpClient) { }

  /** GET heroes from the server */
  getsponsor (): Observable<sponsor[]> {
    return this.http.get<sponsor[]>(this.sponsorUrl);
  }
}
