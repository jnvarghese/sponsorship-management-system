import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Sponsor } from '../../model/sponsor';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Enrollment } from '../../model/index';

@Injectable()
export class SponsorService<T> {

  private sponsorUrl = 'api/sponsors';  // URL to web api

  constructor(private http: Http) { }

  /** GET heroes from the server */
  getSponsors(): Promise<Array<T>> {
    return this.http.get(this.sponsorUrl).toPromise()
      .then((response) => {
        return response.json().data as T[];
      })
      .catch(this.handleError);
  }
  findSponsor(id: number): Promise<T> {
    return this.http.get(`${this.sponsorUrl}/?id=${id}`).toPromise()
      .then((response) => {
        return response.json().data as T;
      })
      .catch(this.handleError);
  }

  save(student: Sponsor): Promise<Sponsor> {
    if (student.id) {
      return this.put(student);
    }
    //student.id = new Date().getMilliseconds();
    return this.post(student);
  }

  // Add new Student
  private post(sponsor: Sponsor): Promise<Sponsor> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.sponsorUrl, JSON.stringify(sponsor), { headers: headers })
      .toPromise()
      .then(() => sponsor)
      .catch(this.handleError);
  }

  // Update existing Student
  private put(sponsor: Sponsor): Promise<Sponsor> {

    const url = `${this.sponsorUrl}/${sponsor.id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .put(url, JSON.stringify(sponsor), { headers: headers })
      .toPromise()
      .then(() => sponsor)
      .catch(this.handleError);
  }

  search(term: string): Promise<Array<T>> {
    return this.http.get(`${this.sponsorUrl}/?firstName=${term}`)
      .toPromise()
      .then((response) => {
        return response.json().data as Array<T>;
      })
      .catch(this.handleError);
  }

  getSponsorShipInfo(id: number): Promise<Enrollment> {
    return this.http.get(`api/sponsorshipDetails/?id=${id}`)
      .toPromise()
      .then((response) => {
        return response.json().data as Enrollment;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
