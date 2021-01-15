import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parish, Center, Initiative, Receipts, Sponsor } from '../../model';
import { AdminService } from '../../shared/service/admin.service';
import { InitService } from '../../shared/service/init.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptsService } from '../../shared/service/receipts.service';
import { ValidatorService } from '../../../shared/validator.service';
import { SponsorService } from '../../shared/service/sponsor.service';
import { Organization } from '../../model/organization';
import { SmartySteetsService } from '../../shared/service/smartysteets.service';

import { Observable, Subject, of } from 'rxjs';

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { StreetSuggestion } from '../../model/streetsuggestion';


@Component({
  selector: 'app-receiptsdetail',
  templateUrl: './receiptsdetail.component.html',
  styleUrls: ['./receiptsdetail.component.css']
})
export class ReceiptsdetailComponent implements OnInit {

  public receiptsForm: FormGroup;
  isReceiptSaved: boolean;
  navigated: boolean;
  pageHeader: string;
  receipt: Receipts;
  organizations: Array<Organization>;
  chosenParish: boolean;
  selectedRangeId: number;
 // selectedParish: string;
  selecteOrgId: number;
  initiatives: Array<Initiative>;
  selectedInitiativeId: number;
  message: string;
  isOrganizationSelected: boolean = false;
  isParishSelected:boolean = false;
  private parishSearchTerms = new Subject<string>();
  private streetSearchTerms = new Subject<string>();
  autoCompleteParishes: Parish[];
  streetSuggestions: Array<StreetSuggestion>;

  constructor(
    private smartySteetsService: SmartySteetsService,
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

    this.parishSearchTerms.pipe(
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
    ).subscribe(res =>  this.autoCompleteParishes = res);

    this.streetSearchTerms.pipe(
      debounceTime(1000), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term => {
          return term // switch to new observable each time
            ? // return the http search observable
            this.smartySteetsService.getStreetSuggestions(term)
            : // or the observable of empty heroes if no search term
            of<StreetSuggestion[]>([])
        }

      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<StreetSuggestion[]>([]);
      })
    ).subscribe(res =>  this.streetSuggestions = res);

    this.pageHeader = 'Create receipt';
    this.createForm();
    //const selectedParishId = this.route.snapshot.params['parishId'];
    this.selectedRangeId = this.route.snapshot.params['rangeId'];
   
    this.adminService.get('/api/init/initiative').subscribe(
      data => this.initiatives = data,
      err => this.handleError
    );
  }

  search(term: string): void {

    this.receiptsForm.patchValue({
      parishId: null,
    })
    // Push a search term into the observable stream.
    this.parishSearchTerms.next(term);
  }

  getStreetSuggestions(term: any){
    this.streetSearchTerms.next(term);
    //this.smartySteetsService.getStreetSuggestions(term);
  }

  onSourceSelect(value: any) {
    //const centerControl = this.receiptsForm.get('centerId');
    const parishControl = this.receiptsForm.get('parishId');
    const organizationControl = this.receiptsForm.get('organizationId');
    if(value == 0){
      this.isParishSelected = true
      this.isOrganizationSelected = false
    }
    else if (value == 1) {
     // centerControl.setValidators(null);
      parishControl.setValidators(null);
      organizationControl.setValidators([Validators.required]);
      this.isOrganizationSelected = true
      this.isParishSelected = false
      this.organizationService.get('/api/admin/orgns')
        .subscribe(
          data => this.organizations = data,
          err => this.handleError
        );
    } else {
      //centerControl.setValidators([Validators.required]);
      this.receiptsForm.get('organizationId').setValue('');
      parishControl.setValidators([Validators.required]);
      organizationControl.setValidators(null);
      this.isOrganizationSelected = false;
      this.isParishSelected = false
    }
    //centerControl.updateValueAndValidity();
    parishControl.updateValueAndValidity();
    organizationControl.updateValueAndValidity();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createForm() {
    this.receiptsForm = this.fb.group({
      receiptId: [''],
      referenceId: [''],
      rdate: [null, [Validators.required, this.validatorService.validateDate]],
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      fullName: '',
      coSponsorName: '',
      transaction: '',
      amount: ['', Validators.required],
      amountInWords: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      parishId: [''],
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
    //this.selectedParishId = receipt.parishId;
    this.selectedInitiativeId = receipt.initiativeId;
    this.receiptsForm.setValue({
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

  setParish(p: Parish){
    this.receiptsForm.patchValue({
      parishId: p.id,
      selectedParish: p.name
    })
    this.autoCompleteParishes = [];
  }

  setAddress(address: StreetSuggestion){
    this.receiptsForm.patchValue({
      streetAddress: address.streetLine,
      city: address.city,
      state: address.state,
      zipCode: address.zipcode,
    })
    this.streetSuggestions = [];
  }

  findSponsor(sponsorCode: string) {
    let parishId = this.receiptsForm.get('parishId').value;
    this.sponsorService.findSponsorParishIdAndSponsorCode(parishId, sponsorCode).subscribe( (sponsor: Sponsor) => {
      this.receiptsForm.patchValue({
        sponsorId: sponsor.id,
        firstName: sponsor.firstName,
        middleName: sponsor.middleInitial || '',
        lastName: sponsor.lastName,
        fullName: sponsor.firstName + ' ' + (sponsor.middleInitial || '') + ' '+ sponsor.lastName,
        streetAddress: sponsor.street || '',
        city: sponsor.city,
        state: sponsor.state,
        zipCode: sponsor.postalCode,
        email1: sponsor.emailAddress,
        phone1: sponsor.phone1 || '',
      })
    });
  }

  reviewReceipt(){

  }

  saveReceipts() {
    /*Parish : 0, Organization : 1, Individual : 2*/
    let referenceId;
    if (this.receiptsForm.get('receiptType').value == 1) {
      referenceId = this.receiptsForm.get('organizationId').value
    } else {
      referenceId = this.receiptsForm.get('parishId').value
    }
    this.receiptsForm.patchValue({
      referenceId: referenceId
    });
    console.log(this.receiptsForm.valid)
    if (this.receiptsForm.valid){
      this.receiptsService.save(this.receiptsForm.value).subscribe(
        (data: Receipts) => {
          this.isReceiptSaved = true;
          this.message = `Receipts saved successfully.`
          this.receiptsForm.reset()
          this.receiptsForm.patchValue({
            type: 0,
            receiptType: 0,
            status: 0
          });
        },
        err => this.handleError
      )
    } else {
      console.error('Validation failed')
    }

  }

  cancel() {
      this.router.navigate(['/home/receipts/list', this.selectedRangeId || 1]);
  }
}
