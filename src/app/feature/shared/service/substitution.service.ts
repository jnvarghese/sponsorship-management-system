import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Substitute } from '../../model/substitute';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

@Injectable()
export class SubstitutionService<T> {

  private api = 'api/substitute';  

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Array<T>>(`${this.api}/list`);
  }

  generateLetter(enrollmentId: number, oldStudentId: number, newStudentId: number){
    return this.http.get(`${this.api}/generatereport/${enrollmentId}/${oldStudentId}/${newStudentId}`, {
        responseType: "blob"
    });
}

}
