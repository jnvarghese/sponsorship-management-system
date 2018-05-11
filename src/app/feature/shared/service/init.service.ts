import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Center, Initializer } from "../../model";

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
@Injectable()
export class InitService {

    private apiurl = 'api/dashboard';

    constructor(private http: HttpClient) { }

    getCenterList() {
        return this.http.get<Array<Center>>(`${this.apiurl}/center`);
    }
   
    getInitializerData() {
        return this.http.get<Initializer>(this.apiurl);
    }
   
}
