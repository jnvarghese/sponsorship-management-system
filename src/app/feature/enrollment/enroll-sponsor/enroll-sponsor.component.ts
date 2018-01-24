import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SponsorService, EnrollService } from '../../index';
import { Enrollment, Sponsor } from '../../model/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enroll-sponsor',
  templateUrl: './enroll-sponsor.component.html',
  styleUrls: ['./enroll-sponsor.component.css']
})
export class EnrollSponsorComponent implements OnInit,OnChanges {

  hasAnySponsorSelected: boolean = false;
  enroll: Enrollment;
  sponsers: Observable<Array<Sponsor>>;
  private sponsorSearchTerms = new Subject<string>();
  sponsorEnrollForm: FormGroup;
  @Input() sponData;
  @Output() sponsor = new EventEmitter();

  constructor(
    private sponsorService: SponsorService<Sponsor>,
    private enrollService: EnrollService,
    private fb : FormBuilder,
    private router: Router) {

      this.createForm();
     }

  @ViewChild('sponsorSearchBox') containerEl: ElementRef;

  ngOnInit() {
    
    this.sponsers = this.sponsorSearchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.sponsorService.search(term)
        // or the observable of empty sponsor if no search term
        : Observable.of<Array<Sponsor>>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Array<Sponsor>>([]);
      });
     if(this.sponData){     
      this.enroll = new Enrollment(
        this.sponData.sponsorId,
        this.sponData.sponsorName, 
        this.sponData.paymentDate, 
        this.sponData.effectiveDate, 
        this.sponData.contributionAmount,
        0,
        this.sponData.sponsee);
        this.pupulateForm(this.sponData);
     }else{
      this.enroll = new Enrollment();
     }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes ', changes);
  }

  pupulateForm(data: any){
    console.log('EnrollSponsorComponent.pupulateForm ',data);
    this.hasAnySponsorSelected = true;
    this.sponsorEnrollForm.setValue({
      sponsorId: data.sponsorId,
      sponsorName: data.sponsorName,
      paymentDate: data.paymentDate,
      contributionAmount: data.contributionAmount,
      effectiveDate: data.effectiveDate,
      sponsee: data.sponsee || []
    });
  }

  createForm() {
    this.sponsorEnrollForm = this.fb.group({
      sponsorId: '',
      sponsorName: '',
      sponsee: '',
      paymentDate: [null, Validators.required],
      contributionAmount:[null, Validators.required],
      effectiveDate: [null, Validators.required]
    });
  }
  searchSponsor(term: string): void {
    this.hasAnySponsorSelected = false;
    // Push a search term into the observable stream.
    this.sponsorSearchTerms.next(term);
  }

  selectSponsor(sponsor: Sponsor) {
    this.containerEl.nativeElement.value = '';
    //this.sponsorSearchTerms.next();
    this.hasAnySponsorSelected = true;
    let fullName = sponsor.firstName +' '+ sponsor.lastName;
    this.enroll.sponsorId = sponsor.id;
    this.enroll.sponsorName = fullName;
    this.sponsorEnrollForm.controls['sponsorId'].setValue(sponsor.id);
    this.sponsorEnrollForm.controls['sponsorName'].setValue(fullName);
  }

  navigate(){
    console.log('sponsorEnrollForm.status '+this.sponsorEnrollForm.status);
    const formModel = this.sponsorEnrollForm.value;
    this.sponsor.emit(formModel);
    //this.enrollService.setup(formModel);
    //this.router.navigate(['/enroll']);
  }
}
