import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EnrollService {

    private enrollment = new Subject<any>();

    setup(data: any): void {
        this.enrollment.next(data);
    } 

    getData(): Observable<any> {
        return this.enrollment.asObservable();
    }

    clearData() {
        this.enrollment.next();
    }
}
