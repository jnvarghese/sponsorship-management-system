import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SponsorService, EnrollService, InitService, AdminService } from '../../index';
import { Enrollment, Sponsor, Parish, Center } from '../../model/index';
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
  sponsorEnrollForm: FormGroup;
  @Input() sponData;
  @Output() sponsor = new EventEmitter();

  sponsors: Array<Sponsor>;
  parishes: Array<Parish>;
  centers: Array<Center>;
  chosenCenter: boolean;
  chosenParish: boolean;

  constructor(
    private sponsorService: SponsorService<Sponsor>,
    private enrollService: EnrollService,
    private initService: InitService,
    private fb : FormBuilder,
    private adminService: AdminService<Parish>,
    private router: Router) {

      this.createForm();
     }

  ngOnInit() {
  
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

     this.initService.getCenterList()
     .then(data => this.centers = data)
     .catch(err => console.log(err))
     this.chosenCenter = false;  
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes ', changes);
  }

  pupulateForm(data: any){
    console.log('EnrollSponsorComponent.pupulateForm ',data);
    this.hasAnySponsorSelected = true;
    this.sponsorEnrollForm.setValue({
      sponsorId: data.sponsorId,
      parishId: data.parishId,
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
      parishId: '',
      sponsorName: '',
      sponsee: '',
      paymentDate: [null, Validators.required],
      contributionAmount:[null, Validators.required],
      effectiveDate: [null, Validators.required]
    });
  }
  selectSponsor(sponsor: Sponsor) {
    console.log(' Enroll Sponsor - Select', sponsor);
    this.hasAnySponsorSelected = true;
    let fullName = sponsor.firstName +' '+ sponsor.lastName;
    this.enroll.sponsorId = sponsor.id;
    this.enroll.parishId = sponsor.parishId;
    this.enroll.sponsorName = fullName;
    this.sponsorEnrollForm.controls['parishId'].setValue(sponsor.parishId);
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

  onCenterSelect(value: any) {
    if(value !== "0"){
      this.chosenCenter = true;
      this.adminService.getById('/api/admin/parishes', +value)
        .then(data => this.parishes = data)
        .catch(err => console.log(err));
    }else{
      this.chosenCenter = false;
    }
  }
  onParishSelect(value: any) {
    if(value !== "0"){
      this.chosenParish = true;
      this.sponsorService.getSponsorsByParishId(+value)
        .then(data => this.sponsors = data)
        .catch(err => console.log(err));
    }else{
      this.chosenParish = false;
    }
  }
}
