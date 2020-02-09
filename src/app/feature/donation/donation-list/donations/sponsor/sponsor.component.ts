
import { Component, OnInit, Input } from '@angular/core';
import { Sponsor, Receipts, SponsorReceipts } from '../../../../model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReceiptsService } from '../../../../shared/service/receipts.service';

@Component({
    selector: 'sponsor',
    templateUrl: './sponsor.component.html',
    styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {

    @Input() sponsor: Sponsor;
    @Input() receipt: Receipts;
    @Input() sponsorReceipts: Array<SponsorReceipts>;
    sr:SponsorReceipts = new SponsorReceipts();
    sponsorForm: FormGroup;
    contributionAmount: FormControl = new FormControl('', Validators.required);
    isSponsorSaved: boolean;
    showLabel: boolean = true;
    enableAmountEntry: boolean = false;

    ngOnInit(): void {

        this.createForm(this.sr);
       
        //this.pupulateForm(this.sponser);
    }
    createForm(sr: SponsorReceipts) {
       
        if(this.sponsorReceipts){
            sr =  this.sponsorReceipts.find(r => r.sponsorId === this.sponsor.id);
        }else{
            console.log(' no sr found ')
        } 

        this.sponsorForm = this.fb.group({
            id: [(sr) ? sr.id : ''],
            contributionAmount: [(sr) ? sr.amount : '0.00', null],
        });
    }

    constructor(private receiptsService: ReceiptsService, private fb: FormBuilder) { }

    enableEdit(){
        this.showLabel = false;
        this.enableAmountEntry = true;
    }

    clearAmount(){
        
        const id =  this.sponsorForm.get('id').value;
        if(id){
            const deleteReceipt = new SponsorReceipts();
            deleteReceipt.id = id;
            this.receiptsService.deleteSponsorReceipt(deleteReceipt).subscribe(
              res =>  {
                  this.sponsorForm.get('contributionAmount').setValue('0.00')
                  this.sponsorForm.get('id').setValue('');
              }, 
              error => console.error('Error while deleting the receipt')
            );
        }
    }

    cancel(){
        this.showLabel = true;
        this.enableAmountEntry = false; 
    }


    saveContribution() {
        const newReceipt = new SponsorReceipts();
        newReceipt.id = this.sponsorForm.get('id').value;
        newReceipt.sponsorId = this.sponsor.id;
        newReceipt.receiptId = this.receipt.receiptId;
        newReceipt.amount = this.sponsorForm.get('contributionAmount').value;
        this.receiptsService.saveSponsor(newReceipt).subscribe(
            (receipt: SponsorReceipts) => {
                if(receipt.id) {
                    this.sponsorForm.get('id').setValue(receipt.id);
                    this.showLabel = true;
                    this.enableAmountEntry = false; 
                }
            },
            err => this.handleError
          )
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}