import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subject, of } from 'rxjs';
import { Receipts, Initiative, Parish, Sponsor } from '../model';
import { Organization } from '../model/organization';
import { ReceiptsService } from '../shared/service/receipts.service';
import { AdminService } from '../shared/service/admin.service';
import { SponsorService } from '../shared/service/sponsor.service';
import { InitService } from '../shared/service/init.service';
import { ValidatorService } from '../../shared/validator.service';

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  public donationForm: FormGroup;
  isReceiptSaved: boolean;
  navigated: boolean;
  pageHeader: string;
  receipt: Receipts;
  organizations: Array<Organization>;
  chosenParish: boolean;
  selectedParishId: number;
  selecteOrgId: number;
  initiatives: Array<Initiative>;
  sponsors: Array<Sponsor>;
  selectedInitiativeId: number;
  message: string;
  parishSelectionMessage: string;
  isOrganizationSelected: boolean = false;
  displaySponsorSearch: boolean;
  displaySponsorList: boolean;
  hideIndividualFields: boolean;
  autofillBySponsorCodeActive: boolean;
  private searchTerms = new Subject<string>();
  autoCompleteParishes: Parish[];
  alternateEmail: boolean;
  mode: string;
  donationTypes: Array<{}>;
  sources: Array<{}>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private receiptsService: ReceiptsService,
    private adminService: AdminService<Initiative>,
    private parishService: AdminService<Parish>,
    private sponsorService: SponsorService<Sponsor>,
    private organizationService: AdminService<Organization>,
    private initService: InitService,
    private validatorService: ValidatorService,
    private fb: FormBuilder) { }


  ngOnInit() {

    this.donationTypes = [ {id :0, value: 'Donation'}, { id: 1, value: 'Sponsorship'} ];
    this.sources = [ {id :0, value: 'Parish'}, { id: 1, value: 'Organization'}, { id:2, value:'Individual'} ];

    
    this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term => {
          return term // switch to new observable each time
            ? // return the http search observable
            this.parishService.search('/api/admin/parishes', term)
            : // or the observable of empty heroes if no search term
            of<Parish[]>([])
        }

      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<Parish[]>([]);
      })
    ).subscribe(res => this.autoCompleteParishes = res);

    this.pageHeader = 'Create new donation';
    this.createForm();
    this.mode = 'entry';
    this.navigated = false;
    this.receipt = new Receipts();

    this.adminService.get('/api/init/initiative').subscribe(
      data => this.initiatives = data,
      err => this.handleError
    );
  }

  messageMaker(message:string): string{
    return message += message
  }
  
  searchSponsor(): void {
    let parishId = this.donationForm.get('parishId').value;
    let firstName = this.donationForm.get('firstName').value;
    let lastName = this.donationForm.get('lastName').value;
    let message = 'Please select';
    let flag = true;
    if(!parishId){
      this.parishSelectionMessage = message+' a parish'
      flag = false;
    }
    if(!firstName){
      this.parishSelectionMessage = 'First name is required'
      flag = false;
    }
    if(!lastName){
      this.parishSelectionMessage = 'Last name is required'
      flag = false;
    }
    if(flag){
      this.parishSelectionMessage = '';
      this.sponsorService.getSponsorsByFirstNameAndLastName(firstName, lastName, parishId)
      .subscribe( 
        data => {
          this.sponsors = data
          if(this.sponsors.length <= 0){
            this.setSponsorData(this.spn);
            this.toggleFields(this.spn, 'enable');
          }
        },
        err => this.handleError
      )
    }   
  }
  setSponsorData(sponsor){
    for (let [key, value] of Object.entries(sponsor)) {
      this.donationForm.get(`${key}`).setValue(`${value}`);
    }
  }

  toggleFields(sponsor = {}, status: string){
    for (let [key, value] of Object.entries(sponsor)) {
      if(status === 'disable'){
        this.donationForm.get(`${key}`).disable();
      } else{
        this.donationForm.get(`${key}`).enable();
      }
    }
  }

  spn = {
    sponsorId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    email1: '', 
    phone1: '',
  };

  chooseSponsor(sponsor: Sponsor): void{
    const { emailAddress, promoterEmail} = sponsor
    this.alternateEmail = (!emailAddress) ? true : false;
    this.setSponsorData({
      sponsorId: sponsor.id,
      firstName: sponsor.firstName,
      middleName: sponsor.middleInitial || '',
      lastName: sponsor.lastName,
      fullName: sponsor.firstName + ' ' + (sponsor.middleInitial || '') + ' ' + sponsor.lastName,
      streetAddress: sponsor.street || '',
      city: sponsor.city,
      state: sponsor.state,
      zipCode: sponsor.postalCode,
      email1: ((emailAddress) ? emailAddress : promoterEmail), 
      phone1: sponsor.phone1 || '',
    })
    this.toggleFields(this.spn, 'disable');
  }
  search(term: string): void {

    this.donationForm.patchValue({
      parishId: null,
    })
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }
  onSourceSelect(value: any) {
    const parishControl = this.donationForm.get('parishId');
    const organizationControl = this.donationForm.get('organizationId');
    const firstNameControl = this.donationForm.get('firstName');
    const lastNameControl = this.donationForm.get('lastName');
    if (value == 2) { // individual
      this.hideIndividualFields = false;
      this.donationForm.get('organizationId').setValue('');
      organizationControl.setValidators(null);

      //this.donationForm.markAsTouched()
      //this.donationForm.get('lastName').markAsTouched()

      firstNameControl.setValidators([Validators.required]);
      lastNameControl.setValidators([Validators.required]);

      this.isOrganizationSelected = false;
    } else if (value == 1) { // organization
      this.donationForm.get('firstName').setValue('');
      this.donationForm.get('middleName').setValue('');
      this.donationForm.get('lastName').setValue('');

      this.displaySponsorSearch = false;
      this.sponsors = [];

      this.alternateEmail = false;
      this.setSponsorData(this.spn);
      this.toggleFields(this.spn, 'enable');

      firstNameControl.setValidators(null);
      lastNameControl.setValidators(null);
      parishControl.setValidators(null);
      organizationControl.setValidators([Validators.required]);
      this.isOrganizationSelected = true
      this.organizationService.get('/api/admin/orgns')
        .subscribe(
          data => this.organizations = data,
          err => this.handleError
        );
      this.hideIndividualFields = true;
    } else {   // parish
      this.donationForm.get('firstName').setValue('');
      this.donationForm.get('middleName').setValue('');
      this.donationForm.get('lastName').setValue('');
      this.donationForm.get('organizationId').setValue('');

      this.displaySponsorSearch = false;
      this.sponsors = [];
      
      this.alternateEmail = false;
      this.setSponsorData(this.spn);
      this.toggleFields(this.spn, 'enable');

      parishControl.setValidators([Validators.required]);
      organizationControl.setValidators(null);
      firstNameControl.setValidators(null);
      lastNameControl.setValidators(null);
      this.isOrganizationSelected = false;
      this.hideIndividualFields = true;
    }
    parishControl.updateValueAndValidity();
    organizationControl.updateValueAndValidity();
    firstNameControl.updateValueAndValidity();
    lastNameControl.updateValueAndValidity();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createForm() {
    this.donationForm = this.fb.group({
      receiptId: [''],
      referenceId: [''],
      rdate: [null, [Validators.required, this.validatorService.validateDate]],
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      fullName: '',
      transaction: '',
      amount: ['', Validators.required],
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      parishId: ['', Validators.required],
      email1: '',
      email2: '',
      phone1: '',
      phone2: '',
      type: 0,
      status: 0,
      item: 0,
      receiptType: 2,
      initiativeId: [null, Validators.required],
      organizationId: '',
      selectedParish: '',
      sponsorCode: '',
      sponsorId: ''
    });
  }
  pupulateForm(receipt: Receipts) {
    this.selectedParishId = receipt.parishId;
    this.selectedInitiativeId = receipt.initiativeId;
    this.donationForm.setValue({
      receiptId: receipt.receiptId,
      rdate: receipt.rdate,
      firstName: receipt.firstName,
      middleName: receipt.middleName || '',
      lastName: receipt.lastName,
      fullName: receipt.fullName,
      transaction: receipt.transaction,
      amount: receipt.amount,
      initiativeId: receipt.initiativeId || '',
      streetAddress: receipt.streetAddress || '',
      city: receipt.city,
      state: receipt.state,
      zipCode: receipt.zipCode,
      parishId: receipt.parishId,
      email1: receipt.email1 || '',
      email2: receipt.email2,
      phone1: receipt.phone1 || '',
      phone2: receipt.phone2,
      type: receipt.type,
      status: receipt.status || 0,
    });
  }

  setParish(p: Parish) {
    this.donationForm.patchValue({
      parishId: p.id,
      selectedParish: p.name,
      email1: p.promoterEmail
    })
    this.autoCompleteParishes = [];
  }

  findSponsor(sponsorCode: string) {
    let parishId = this.donationForm.get('parishId').value;
    if (sponsorCode) {
      this.sponsorService.findSponsorParishIdAndSponsorCode(parishId, sponsorCode).subscribe((sponsor: Sponsor) => {
        this.autofillBySponsorCodeActive = true;
        this.donationForm.patchValue({
          sponsorId: sponsor.id,
          firstName: sponsor.firstName,
          middleName: sponsor.middleInitial || '',
          lastName: sponsor.lastName,
          fullName: sponsor.firstName + ' ' + (sponsor.middleInitial || '') + ' ' + sponsor.lastName,
          streetAddress: sponsor.street || '',
          city: sponsor.city,
          state: sponsor.state,
          zipCode: sponsor.postalCode,
          email1: sponsor.emailAddress,
          phone1: sponsor.phone1 || '',
        })
      },
        err => {
          this.displaySponsorSearch = true;
          console.error('no sponsor found');
        },
        () => { console.log(' exiting from sponsor find ') }
      );
    } else {
      this.displaySponsorSearch = true;
    }
  }

  reviewReceipt() {

  }

  saveDonations() {
    /*Parish : 0, Organization : 1, Individual : 2*/
    let referenceId;
    if (this.donationForm.get('receiptType').value == 1) {
      referenceId = this.donationForm.get('organizationId').value
    } else {
      referenceId = this.donationForm.get('parishId').value
    }
    this.donationForm.patchValue({
      referenceId: referenceId
    });
    if (this.donationForm.valid) {
      this.receiptsService.save(this.donationForm.value).subscribe(
        (data: Receipts) => {
          this.mode = "complete";
          this.isReceiptSaved = true;
          this.message = `Receipts saved successfully.`
          this.donationForm.patchValue({receiptId: data.receiptId, sponsorId: data.sponsorId})
        },
        err => this.handleError
      )
    } else {
      console.error('Validation failed')
    }

  }

  cancel() {
    if (this.selectedParishId) {
      this.router.navigate(['/home/receipts/list', this.selectedParishId]);
    } else {
      this.router.navigate(['/home/receipts/list']);
    }
  }

  continue(){
    this.mode = 'review'
  }

  previous(){
    this.mode = 'entry'
  }
}
