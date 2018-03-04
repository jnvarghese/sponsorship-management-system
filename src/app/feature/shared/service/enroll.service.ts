import { Injectable } from '@angular/core';
import { Enrollment } from '../../model/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
            
@Injectable()
export class EnrollService {

    private sponsorUrl = 'api/enroll';

    constructor(private http: HttpClient) { }

    save(enrollment: Enrollment) {
        return this.http.post<Enrollment>(`${this.sponsorUrl}/enroll`, JSON.stringify(enrollment), { headers });
    }
  
}
