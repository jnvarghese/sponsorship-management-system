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
        return this.httpClient.put<Receipts>(`${this.api}/modify/${r.receiptId}`, JSON.stringify(r),{ headers });
    }
}