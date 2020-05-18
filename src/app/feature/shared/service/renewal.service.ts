import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Renewal } from "../../model/renewal";
import { Observable } from "rxjs/Observable";


@Injectable()
export class RenewalService {

    private api = 'api/renewal';  // URL to web api

    constructor(private httpClient: HttpClient) { }

    generateLetter(receiptId: number){
        return this.httpClient.get(this.api + "/generaterenewal/" + receiptId, {
            responseType: "blob"
        });
    }

    list(): Observable<Array<Renewal>> {
        return this.httpClient.get<Array<Renewal>>(`${this.api}/list`)
    }
}