import { Injectable } from '@angular/core';
import { Enrollment, ViewEnroll } from '../../model/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Summary } from '../../model/summary';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
            
@Injectable()
export class EnrollService {

    private apiUrl = 'api';

    constructor(private http: HttpClient) { }

    save(enrollment: Enrollment) {
        return this.http.post<Enrollment>(`${this.apiUrl}/enroll`, JSON.stringify(enrollment), { headers });
    }

    release(enrollmentId: number) {
        return this.http.post<String>(`${this.apiUrl}/release`, {enrollmentId: enrollmentId}, { headers });
    }

    listEnrollments(parishId: number){
        return this.http.get<Array<ViewEnroll>>(`${this.apiUrl}/view/enrollment/${parishId}`);
    }

    getSummary(parishId: number){
        return this.http.get<Array<Summary>>(`${this.apiUrl}/enrollment/viewsummary/${parishId}`);
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

    generateSummary(parishId: number): Observable<Blob>{     
        return this.http.get(`${this.apiUrl}/enrollment/summarypdf/${parishId}`, {
            responseType: "blob"
        });
    }
}
