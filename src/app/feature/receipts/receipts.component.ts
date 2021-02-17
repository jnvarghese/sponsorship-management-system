import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Receipts, Parish } from '../model';
import { ReceiptsService } from '../shared/service/receipts.service';
import { AdminService } from '../shared/service/admin.service';
import { saveAs as importedSaveAs } from "file-saver";

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
  rangeId: number;

  @ViewChild('receiptId') receiptIdElement: ElementRef;
  @ViewChild('lastName') lastNameElement: ElementRef;
  @ViewChild('firstName') firstNameElement: ElementRef;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private receiptsService: ReceiptsService) { }

  ngOnInit() {
    let range = this.rangeId || 1;
    this.getListByRange(range);
  }

  getListByRange(rangeId: number) {
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

  onRageSelect(rangeId: number) {
    this.resetAdvancedSearch();
    this.rangeId = rangeId;
    this.getListByRange(rangeId);
  }

  sortByReceiptId() {
    console.log('cliked');
    this.receipts.sort((m1, m2) => {
      if (m1.receiptId > m2.receiptId) return 1;
      if (m1.receiptId === m2.receiptId) return 0;
      if (m1.receiptId < m2.receiptId) return -1;
    });
  }

  sortByFullName() {
    this.receipts.sort((m1, m2) => {
      if (m1.fullName > m2.fullName) return 1;
      if (m1.fullName === m2.fullName) return 0;
      if (m1.fullName < m2.fullName) return -1;
    });
  }

  sortByReceiptDate() {
    this.receipts.sort((m1, m2) => {
      if (m1.rdate > m2.rdate) return 1;
      if (m1.rdate === m2.rdate) return 0;
      if (m1.rdate < m2.rdate) return -1;
    });
  }

  sortByInitiativeName() {
    this.receipts.sort((m1, m2) => {
      if (m1.initiativeName > m2.initiativeName) return 1;
      if (m1.initiativeName === m2.initiativeName) return 0;
      if (m1.initiativeName < m2.initiativeName) return -1;
    });
  }

  generateReceipt(receiptId: number, uploadedStatus: number, remoteFileName: string) { // 0 for not uploaded 1 for uploaded
    console.log( ` uploadedStatus ${uploadedStatus} , remoteFileName ${remoteFileName}`)
    if (uploadedStatus === 0) {
      this.receiptsService.createReceipt(receiptId).subscribe(
        blob => {
          importedSaveAs(blob, receiptId.toString());
        },
        () => {
          console.log(' Downloaded. ');
        }
      );
    } else {
      this.receiptsService.rePrintReceipt(receiptId, remoteFileName).subscribe(
        blob => {
          importedSaveAs(blob, receiptId.toString());
        },
        () => {
          console.log(' Downloaded. ');
        }
      );
    }
  };

  expandSearch() {

  }

  resetAdvancedSearch() {
    this.firstNameElement.nativeElement.value = '';
    this.lastNameElement.nativeElement.value = '';
    this.receiptIdElement.nativeElement.value = '';
  }

  cancelSearch() {
    this.getListByRange(1);
    this.resetAdvancedSearch();
  }

  searchByFirstAndLastName() {
    this.receiptsService.findReceiptsByFnAndLn(
      this.firstNameElement.nativeElement.value, this.lastNameElement.nativeElement.value)
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

  findReceiptById() {
    this.receiptsService.findReceipts(this.receiptIdElement.nativeElement.value)
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

  addReceipts(): void {
    this.router.navigate(['/home/receipts/add', this.rangeId || 1]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
