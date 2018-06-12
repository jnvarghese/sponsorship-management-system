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
    private receiptsService: ReceiptsService,
    private adminService: AdminService<Parish>) { }

  ngOnInit() {
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
  }


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

  addReceipts(): void {
    this.router.navigate(['/home/receipts/add']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
