import { Injectable } from '@angular/core';
import { Enrollment, ViewEnroll } from '../../model/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
            
@Injectable()
export class EnrollService {

    private apiUrl = 'api';

    constructor(private http: HttpClient) { }

    save(enrollment: Enrollment) {
        return this.http.post<Enrollment>(`${this.apiUrl}/enroll`, JSON.stringify(enrollment), { headers });
    }

    listEnrollments(parishId: number){
        return this.http.get<Array<ViewEnroll>>(`${this.apiUrl}/view/enrollment/${parishId}`);
    }

    

    generateReport(enrollmentId: number): Observable<Blob>{     
        return this.http.get(`${this.apiUrl}/enrollment/generatereport/${enrollmentId}`, {
            responseType: "blob"
        });
    }

    generateReceipt(enrollmentId: number): Observable<Blob>{     
        return this.http.get(`${this.apiUrl}/enrollment/generatereceipt/${enrollmentId}`, {
            responseType: "blob"
        });
    }
  
}
