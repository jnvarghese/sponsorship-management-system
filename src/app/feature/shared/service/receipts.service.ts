import { Injectable } from "@angular/core";
import { Receipts } from "../../model";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

@Injectable()
export class ReceiptsService {

    private api = 'api/receipts';  // URL to web api

    constructor(private httpClient: HttpClient) { }


    listByRange(range: number): Observable<Array<Receipts>> {
        console.log(' range ', range);
        let rangeValue;
        if (range == 1) {
            rangeValue = 30;
        } else if (range == 2) {
            rangeValue = 90;
        } else if (range == 3) {
            rangeValue = 180;
        } else if (range == 4) {
            rangeValue = 365;
        } else if (range == 5) {
            rangeValue = 730;
        }
        console.log(' rangeValue ', rangeValue);
        return this.httpClient.get<Array<Receipts>>(`${this.api}/listbyrange/${rangeValue}`)
    }

    getReceiptsByParishId(parishId: number): Observable<Array<Receipts>> {
        return this.httpClient.get<Array<Receipts>>(`${this.api}/listbyparish/${parishId}`)
    }

    findReceipt(id: number) {
        return this.httpClient.get<Receipts>(`${this.api}/find/${id}`);
    }

    save(r: Receipts) {
        if (r.receiptId) {
            return this.put(r);
        }
        return this.post(r);
    }

    private post(r: Receipts) {
        return this.httpClient
            .post<Receipts>(`${this.api}/add`, JSON.stringify(r), { headers });
    }

    private put(r: Receipts) {
        return this.httpClient.put<Receipts>(`${this.api}/modify/${r.receiptId}`, JSON.stringify(r), { headers });
    }
}