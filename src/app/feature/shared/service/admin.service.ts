import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Enrollment, Agency, Project, Parish } from '../../model/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

type admintype = Agency | Project | Parish;
@Injectable()
export class AdminService<T> {

  constructor(private http: Http) { }

  get(url: string): Promise<Array<T>> {
    return this.http.get(`${url}/list`).toPromise()
      .then((response) => {
        return response.json() as T[];
      })
      .catch(this.handleError);
  }

  getById(url: string, centerId: number): Promise<Array<T>> {
    return this.http.get(`${url}/list/${centerId}`).toPromise()
      .then((response) => {
        return response.json() as T[];
      })
      .catch(this.handleError);
  }

  find(url: string, id: number): Promise<T> {
    return this.http.get(`${url}/find/${id}`).toPromise()
      .then((response) => {
        return response.json() as T;
      })
      .catch(this.handleError);
  }

  save(url: string, e: admintype, id: number, parishId: number): Promise<T> {
    if (id) {      
      return this.put(url, e);
    }
    return this.post(url, e);
  }

  // Add new Student
  private post(url: string, e: admintype): Promise<T> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(`${url}/add`, JSON.stringify(e), { headers: headers })
      .toPromise()
      .then(() => e)
      .catch(this.handleError);
  }

  // Update existing Student
  private put(urlparam: string, e: admintype): Promise<T> {
    const url = `${urlparam}/modify/${e.id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(url, JSON.stringify(e), { headers: headers })
      .toPromise()
      .then(() => e)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}