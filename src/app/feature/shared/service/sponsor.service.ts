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

  private sponsorUrl = 'api/sponsor';  // URL to web api

  constructor(private http: Http) { }

  getSponsors(): Promise<Array<T>> {
    return this.http.get(`${this.sponsorUrl}/list`).toPromise()
      .then((response) => {
        return response.json() as T[];
      })
      .catch(this.handleError);
  }

  getSponsorsByParishId(id: number): Promise<Array<T>> {
    return this.http.get(`${this.sponsorUrl}/listbyparish/${id}`).toPromise()
      .then((response) => {
        return response.json() as T[];
      })
      .catch(this.handleError);
  }

  findSponsor(id: number): Promise<T> {
    return this.http.get(`${this.sponsorUrl}/find/${id}`).toPromise()
      .then((response) => {
        return response.json() as T;
      })
      .catch(this.handleError);
  }

  save(sponsor: Sponsor, id: number): Promise<T> {
    if (id) {
      sponsor.id = id;
      return this.put(sponsor);
    }
    return this.post(sponsor);
  }

  // Add new Student
  private post(sponsor: Sponsor): Promise<T> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('Sponsor before add ', JSON.stringify(sponsor));
    return this.http
      .post(`${this.sponsorUrl}/add`, JSON.stringify(sponsor), { headers: headers })
      .toPromise()
      .then((data) => console.log(data))
      .catch(this.handleError);
  }

  // Update existing Student
  private put(sponsor: Sponsor): Promise<T> {
    const url = `${this.sponsorUrl}/modify/${sponsor.id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(url, JSON.stringify(sponsor), { headers: headers })
      .toPromise()
      .then(() => sponsor)
      .catch(this.handleError);
  }

  search(term: string): Promise<Array<T>> {
    return this.http.get(`${this.sponsorUrl}/search/${term}`)
      .toPromise()
      .then((response) => {
        return response.json() as Array<T>;
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
