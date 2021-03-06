import { Injectable } from "@angular/core";
import { Receipts, SponsorReceipts } from "../../model";
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';

const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

@Injectable()
export class ReceiptsService {

    private api = 'api/receipts';  // URL to web api

    constructor(private httpClient: HttpClient) { }

    refresh(receiptId: number) {
        return this.httpClient.get<Receipts>(`${this.api}/amount/${receiptId}`);
    }

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
        return this.httpClient.get<Array<Receipts>>(`${this.api}/listbyrange/${rangeValue}`)
    }

    findReceipts(id: number) {
        return this.httpClient.get<Array<Receipts>>(`${this.api}/receipts/${id}`);
    }

    findReceiptsByFnAndLn(fn: string, ln: string) {
        let fname = fn || 0;
        let lname = ln || 0;
        return this.httpClient.get<Array<Receipts>>(`${this.api}/receipts/fn/${fname}/ln/${lname}`);
    }

    save(r: Receipts) {
        if (r.receiptId) {
            return this.put(r);
        }
        return this.post(r);
    }

    saveSponsorReceipts(r: SponsorReceipts) {
        if (r.id) {
            return this.putSponsorReceipt(r);
        }
        return this.postSponsorReceipt(r);
    }

    rePrintReceipt(receiptId: number, fileName: string) {
        return this.httpClient.get(this.api + "/reprintreceipt/" + receiptId + "/filename/" + fileName, {
            responseType: "blob"
        });

    }

    createReceipt(receiptId: number) {
        return this.httpClient.get(this.api + "/createreceipt/" + receiptId, {
            responseType: "blob"
        });
    }

    private post(r: Receipts) {
        return this.httpClient
            .post<Receipts>(`${this.api}/add`, JSON.stringify(r), { headers });
    }

    private put(r: Receipts) {
        return this.httpClient.put<Receipts>(`${this.api}/modify/${r.receiptId}`, JSON.stringify(r), { headers });
    }

    getSponsorReceiptsByReceiptId(receiptId: number): Observable<Array<SponsorReceipts>> {
        return this.httpClient.get<Array<SponsorReceipts>>(`${this.api}/listbyreceiptid/${receiptId}`)
    }

    private postSponsorReceipt(r: SponsorReceipts) {
        return this.httpClient
            .post<SponsorReceipts>(`${this.api}/addSponsorReceipt`, JSON.stringify(r), { headers });
    }

    private putSponsorReceipt(r: SponsorReceipts) {
        return this.httpClient.put<SponsorReceipts>(`${this.api}/modifySponsorReceipt`, JSON.stringify(r), { headers });
    }

    public deleteSponsorReceipt(r: SponsorReceipts) {
        return this.httpClient.put<SponsorReceipts>(`${this.api}/deleteSponsorReceipt/${r.id}`, {}).pipe(catchError(this.handleError));
    }

    private handleError(res: HttpErrorResponse | any) {
        console.error(res.error || res.body.error);
        return observableThrowError(res.error || 'Server error');
    }
}