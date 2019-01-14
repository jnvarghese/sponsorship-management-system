import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Receipts, Parish } from '../model';
import { ReceiptsService } from '../shared/service/receipts.service';
import { AdminService } from '../shared/service/admin.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  selectedParish: number;
  parishes: Array<Parish>;
  message: string;
  receipts: Array<Receipts>;
  displayReceiptsList: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private receiptsService: ReceiptsService) { }

  ngOnInit() {
    this.receiptsService.listByRange(1)
      .subscribe(
        data => {
          this.receipts = data
          if (this.receipts.length > 0) {
            this.displayReceiptsList = true;
          } else {
            this.displayReceiptsList = false;
          }
        },
        err => this.handleError
    );
    /*
    const selectedParishId = this.route.snapshot.params['parishId'];
    if(selectedParishId){
      this.onParishSelect(selectedParishId);
    }
    this.adminService.get('/api/admin/parishes')
      .subscribe(
        data => this.parishes = data,
        err => this.handleError
      );
    this.message = 'Please select a parish to see the receipts.'
    */
  }
  onRageSelect(rangeId: number){
    this.receiptsService.listByRange(rangeId)
      .subscribe(
        data => {
          this.receipts = data
          if (this.receipts.length > 0) {
            this.displayReceiptsList = true;
          } else {
            this.displayReceiptsList = false;
          }
        },
        err => this.handleError
    );
  }

  sortByReceiptId(){
    console.log('cliked');
    this.receipts.sort((m1, m2) => {
      if (m1.receiptId > m2.receiptId) return 1;
      if (m1.receiptId === m2.receiptId) return 0;
      if (m1.receiptId < m2.receiptId) return -1;
    });
  }

  sortByFullName(){
    this.receipts.sort((m1, m2) => {
      if (m1.fullName > m2.fullName) return 1;
      if (m1.fullName === m2.fullName) return 0;
      if (m1.fullName < m2.fullName) return -1;
    });
  }

  sortByReceiptDate(){
    this.receipts.sort((m1, m2) => {
      if (m1.rdate > m2.rdate) return 1;
      if (m1.rdate === m2.rdate) return 0;
      if (m1.rdate < m2.rdate) return -1;
    });
  }

  sortByInitiativeName(){
    this.receipts.sort((m1, m2) => {
      if (m1.initiativeName > m2.initiativeName) return 1;
      if (m1.initiativeName === m2.initiativeName) return 0;
      if (m1.initiativeName < m2.initiativeName) return -1;
    });
  }

 /*
  onParishSelect(parishId: number) {
    if (parishId != 0) {
      this.selectedParish = parishId;
      this.message = null;
      this.receiptsService.getReceiptsByParishId(parishId).subscribe(
        data => {
          this.receipts = data
          if (this.receipts.length > 0) {
            this.displayReceiptsList = true;
          } else {
            this.displayReceiptsList = false;
          }
        },
        err => this.handleError
      );
    } else {
      this.message = 'Please select a parish to see the receipts.'
    }
  }
*/
  addReceipts(): void {
    this.router.navigate(['/home/receipts/add']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}