import { Enrollment, Agency, Project, Parish } from '../../model/index';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type admintype = Agency | Project | Parish;
const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
@Injectable()
export class AdminService<T> {

  constructor(private http: HttpClient) { }

  search(url: string, term: string): Observable<Parish[]> {
    console.log(' url ', `${url}/search/${term}`);
    return this.http.get<Parish[]>(`${url}/search/${term}`)
      .pipe(catchError(this.handleError));
  }

  get(url: string) {
    return this.http.get<Array<T>>(`${url}/list`);     
  }

  getById(url: string, id: number) {
    return this.http.get<Array<T>>(`${url}/list/${id}`);
  }

  find(url: string, id: number) {
    return this.http.get<T>(`${url}/find/${id}`);
  }

  save(url: string, e: admintype, id?: number, parishId?: number) {
    if (id) {
      e.id = id;
      return this.put(url, e);
    }
    return this.post(url, e);
  }

  private post(url: string, e: admintype) {
    return this.http
      .post<T>(`${url}/add`, JSON.stringify(e), { headers });
  }

  private put(urlparam: string, e: admintype) {
    return this.http.put<T>(`${urlparam}/modify/${e.id}`, JSON.stringify(e), { headers});
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
