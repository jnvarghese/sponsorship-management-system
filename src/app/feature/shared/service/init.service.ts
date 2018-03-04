import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Center, Initializer } from "../../model";

@Injectable()
export class InitService {

    private apiurl = 'api/dashboard';

    constructor(private httpClient: HttpClient) { }

    getCenterList() {
        return this.httpClient.get<Array<Center>>(`${this.apiurl}/center`);
    }

    getInitializerData() {
        return this.httpClient.get<Initializer>(this.apiurl);
    }

}
