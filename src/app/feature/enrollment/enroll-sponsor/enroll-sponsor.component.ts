import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
import { Enrollment, Sponsor, Parish, Center } from "../../model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SponsorService, EnrollService, AdminService, InitService } from "../..";
import { Router } from "@angular/router";
import { ValidatorService } from "../../../shared/validator.service";
import * as moment from 'moment';

@Component({
  selector: 'app-enroll-sponsor',
  templateUrl: './enroll-sponsor.component.html',
  styleUrls: ['./enroll-sponsor.component.css']
})
export class EnrollSponsorComponent implements OnInit {

  hasAnySponsorSelected: boolean = false;
  enroll: Enrollment;
  sponsorEnrollForm: FormGroup;
  @Input() sponData;
  @Output() sponsor = new EventEmitter();
  mode: 'manual' | 'cruise' = 'manual';

  sponsors: Array<Sponsor>;
  parishes: Array<Parish>;
  centers: Array<Center>;
  chosenCenter: boolean;
  chosenParish: boolean;

  constructor(
    private sponsorService: SponsorService<Sponsor>,
    private enrollService: EnrollService,
    private initService: InitService,
    private fb: FormBuilder,
    private adminService: AdminService<Parish>,
    private router: Router,
    private validatorService: ValidatorService) {

    this.createForm();
  }

  ngOnInit() {

    if (this.sponData) {
      this.enroll = new Enrollment(
        this.sponData.sponsorId,
        this.sponData.sponsorName,
        this.sponData.effectiveDate, // paymentDate,
        this.sponData.effectiveDate,
        this.sponData.contributionAmount,
        0,
        this.sponData.sponsee);
      this.pupulateForm(this.sponData);
    } else {
      this.enroll = new Enrollment();
    }

    this.initService.getCenterList().subscribe(
      data => this.centers = data,
      err => console.log(err)
    );
    this.chosenCenter = false;
  }


  onModeSelect(value: string) {
    if (value === 'manual') {
      this.mode= 'manual';
      this.sponsorEnrollForm.get('expirationMonth').setValidators([Validators.required, Validators.minLength(1)]);
      this.sponsorEnrollForm.get('expirationMonth').updateValueAndValidity();
      this.sponsorEnrollForm.get('expirationYear').setValidators([Validators.required, Validators.minLength(4)]);
      this.sponsorEnrollForm.get('expirationYear').updateValueAndValidity();
      this.sponsorEnrollForm.get('studentCount').setValidators([Validators.required, Validators.minLength(1)]);
      this.sponsorEnrollForm.get('studentCount').updateValueAndValidity();
    } else if (value === 'cruise') {
      this.mode= 'cruise';
      this.sponsorEnrollForm.get('expirationMonth').clearValidators();
      this.sponsorEnrollForm.get('expirationMonth').updateValueAndValidity();
      this.sponsorEnrollForm.get('expirationYear').clearValidators();
      this.sponsorEnrollForm.get('expirationYear').updateValueAndValidity();
      this.sponsorEnrollForm.get('studentCount').clearValidators();
      this.sponsorEnrollForm.get('studentCount').updateValueAndValidity();
    } else {
      console.log(' Non supporting mode selected. ')
    }
  }

  pupulateForm(data: any) {
    console.log('EnrollSponsorComponent.pupulateForm ', data);
    this.hasAnySponsorSelected = true;
    this.sponsorEnrollForm.setValue({
      sponsorId: data.sponsorId,
      parishId: data.parishId,
      sponsorName: data.sponsorName,
     // paymentDate: data.paymentDate,
      contributionAmount: data.contributionAmount,
      effectiveDate: data.effectiveDate,
      studentCount: data.studentCount,
      expirationMonth: data.expirationMonth,
      expirationYear: data.expirationYear,
      sponsee: data.sponsee || []
    });
    this.onModeSelect(data.mode);
  }

  createForm() {
    this.sponsorEnrollForm = this.fb.group({
      sponsorId: '',
      parishId: '',
      sponsorName: '',
      sponsee: '',
      studentCount: '',
      expirationMonth: '',
      expirationYear:  '',
      //paymentDate: [moment(new Date()).format("MM/DD/YYYY"), [Validators.required, this.validatorService.validateDate]],
      contributionAmount: [null, Validators.required],
      effectiveDate: [moment(new Date()).format("MM/DD/YYYY"), [Validators.required, this.validatorService.validateDate]]
    });
  }

  selectSponsor(sponsor: Sponsor) {
    console.log(' Enroll Sponsor - Select', sponsor);
    this.onModeSelect('manual');
    this.hasAnySponsorSelected = true;
    let fullName = sponsor.firstName + ' ' + sponsor.lastName;
    this.enroll.sponsorId = sponsor.id;
    this.enroll.parishId = sponsor.parishId;
    this.enroll.sponsorName = fullName;
    this.sponsorEnrollForm.controls['parishId'].setValue(sponsor.parishId);
    this.sponsorEnrollForm.controls['sponsorId'].setValue(sponsor.id);
    this.sponsorEnrollForm.controls['sponsorName'].setValue(fullName);
  }

  navigate() {
    console.log('sponsorEnrollForm.status ' + this.sponsorEnrollForm.status);
    const formModel = this.sponsorEnrollForm.value;
    formModel.mode = this.mode;
    this.sponsor.emit(formModel);
  }

  onCenterSelect(value: any) {
    if (value !== "0") {
      this.chosenCenter = true;
      this.adminService.getById('/api/admin/parishes', +value)
        .subscribe(
          data => this.parishes = data,
          err => console.log(err)
        );
    } else {
      this.chosenCenter = false;
    }
  }
  onParishSelect(value: any) {
    if (value !== "0") {
      this.chosenParish = true;
      this.sponsorService.getSponsorsByParishId(+value)
        .subscribe(data => {
          this.sponsors = data;
          if (this.sponsors.length <= 0) {
            this.hasAnySponsorSelected = false;
          }
        },
          err => console.log(err)
        );
    } else {
      this.chosenParish = false;
    }
  }

  reset() {
    this.hasAnySponsorSelected = false;
    this.createForm();
    this.enroll = new Enrollment();
  }
}
