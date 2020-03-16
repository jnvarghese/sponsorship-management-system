import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptsService } from '../../shared/service/receipts.service';
import { Receipts } from '../../model';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {

  individualReceipts: Array<Receipts>;
  parishReceipts: Array<Receipts>;
  organizationReceipts: Array<Receipts>;
  ind:string = 'INDL';
  prh:string = 'PRH';
  org:string = 'ORG';
  displayReceiptsList: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private receiptsService: ReceiptsService) { }

  ngOnInit() {
    this.onRageSelect(1);
  }

  onRageSelect(rangeId: number){
    this.receiptsService.listByRange(rangeId)
      .subscribe(
        data => {
          // parish
          this.parishReceipts = data.filter(d=> d.receiptType == 0 );
          //organization
          this.organizationReceipts = data.filter(d=> d.receiptType == 1 );
          // individual
          this.individualReceipts = data.filter(d=> d.receiptType == 2 );
         
         /* this.receipts = data
          if (this.receipts.length > 0) {
            this.displayReceiptsList = true;
          } else {
            this.displayReceiptsList = false;
          }*/
        },
        err => this.handleError
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
