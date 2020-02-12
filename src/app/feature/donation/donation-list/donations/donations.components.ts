
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  public sponsors: Array<Sponsor> = [];
  public sponsor: Sponsor;
  public sponsorReceipts: Array<SponsorReceipts> = [];
  displaySponsorList: boolean = false;
  @ViewChild('firstName') firstNameElement: ElementRef;
  @ViewChild('lastName') lastNameElement: ElementRef;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  constructor(private receiptsService: ReceiptsService, private sponsorService: SponsorService<Sponsor>) {
  }

  onParishSelectClear(){
    this.sponsors = [];
    //this.displaySponsorList = false;
  }

  search(parishId: number) {
    this.sponsorService.getSponsorsByFirstNameAndLastName(
      this.firstNameElement.nativeElement.value,
      this.lastNameElement.nativeElement.value, parishId).subscribe(
      data => {
        this.sponsors = data
        if (this.sponsors.length > 0) {
          this.displaySponsorList = true;
        } else {
          this.displaySponsorList = false;
        }
      },
      err => {
        console.error('no sponsor found');
      },
      () => { console.log(' exiting from sponsor find ') }
    );

  }

  findSponsorBySponsorCode(sponsorCode: string, parishId: number) {
    if (sponsorCode) {
      this.sponsorService.findSponsorParishIdAndSponsorCode(parishId, sponsorCode).subscribe(
        data => { 
          console.log(this.sponsors)
          console.log(data)
          this.sponsors.push(data)
          if (this.sponsors.length > 0) {
            this.displaySponsorList = true;
          } else {
            this.displaySponsorList = false;
          }
        },
        err => {
          console.error('no sponsor found');
        },
        () => { console.log(' exiting from sponsor find ') }
      );
    }
  }
  onParishSelect(parishId: number, receiptId: number): void {

    this.receiptsService.getSponsorReceiptsByReceiptId(receiptId).subscribe(
      data => {
        this.sponsorReceipts = data
      },
      err => { console.error('Error fetching sponsor receipts! ') }
    );
    if (this.sponsorReceipts) {
      this.sponsorService.getSponsorsByParishId(parishId).subscribe(
        data => {
          this.sponsors = data
          if (this.sponsors.length > 0) {
            this.displaySponsorList = true;
          } else {
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