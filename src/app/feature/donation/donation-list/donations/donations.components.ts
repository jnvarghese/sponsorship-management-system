
import { Component, OnInit, Input } from '@angular/core';
import { Sponsor, SponsorReceipts } from '../../../model';
import { SponsorService } from '../../../shared/service/sponsor.service';
import { ReceiptsService } from '../../../shared/service/receipts.service';

@Component({
  selector: 'donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

    @Input() receipts;
    @Input() type;
    public sponsors: Array<Sponsor>;
    public sponsorReceipts: Array<SponsorReceipts>;
    displaySponsorList: boolean = false;
    
    ngOnInit(): void {
       // throw new Error("Method not implemented.");
    }
    constructor(private receiptsService: ReceiptsService, private sponsorService: SponsorService<Sponsor>){
    }

    onParishSelect(parishId: number, receiptId: number): void{
     
      this.receiptsService.getSponsorReceiptsByReceiptId(receiptId).subscribe(
        data => {
          this.sponsorReceipts = data},
        err => { console.error('Error fetching sponsor receipts! ')}
       );
      if(this.sponsorReceipts){
        this.sponsorService.getSponsorsByParishId(parishId).subscribe(
          data => {
            this.sponsors = data
            if(this.sponsors.length>0){
              this.displaySponsorList = true;
            }else{
              this.displaySponsorList = false;
            }
          },
          err => this.handleError
        );
      }

      
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }
}