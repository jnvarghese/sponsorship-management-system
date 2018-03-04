import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sponsor, Parish } from '../../model/index';
import { Component, Input, OnInit } from '@angular/core';
import { SponsorService } from '../../shared/service/sponsor.service';
import { AdminService } from '../../shared/service/admin.service';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.css']
})
export class SponsorDetailComponent implements OnInit {

  pageHeader: string;
  @Input() sponser: Sponsor;
  error: any;
  navigated = false; // true if navigated here
  isSponsorSaved: boolean = false;
  public sponsorForm: FormGroup;
  public address: FormGroup;
  parishes: Array<Parish>;
  selectedParishId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sponsorService: SponsorService<Sponsor>,
    private adminService: AdminService<Parish>,
    private fb: FormBuilder) { }

  // http://plnkr.co/edit/mWhYtc2nf8hSHFbLWlEx?p=preview

  ngOnInit() {
    this.pageHeader = 'Add new sponsor';
    this.createForm();
    const sponsorId = this.route.snapshot.params['id'];
    if (sponsorId !== undefined) {
      this.pageHeader = 'Modify sponsor'
      const id = +sponsorId;
      this.navigated = true;
      this.sponsorService.findSponsor(id)
        .subscribe(
          res => {
            this.sponser = res;
            this.pupulateForm(this.sponser);
          },
          err => this.handleError
        );
    } else {
      this.navigated = false;
      this.sponser = new Sponsor();
    }

    this.adminService.get('/api/admin/parishes')
      .subscribe(
        data => this.parishes = data,
        err => this.handleError
      );
  }

  createForm() {
    this.sponsorForm = this.fb.group({
      firstName: ['', Validators.required],
      middleInitial: '',
      lastName: ['', Validators.required],
      nickName: '',
      dayOfBirth: 1,
      monthOfBirth: 1,
      emailAddress: [''],
      coSponserName: '',
      parishId: [null, Validators.required],
      sponsorStatus: 0,
      street: '',
      appartmentNumber: '',
      city: '',
      state: '',
      postalCode: [null, Validators.pattern('^(0|[1-9][0-9]*)$')]
    });
  }
  pupulateForm(sponser: Sponsor) {
    this.selectedParishId = sponser.parishId;
    this.sponsorForm.setValue({
      firstName: sponser.firstName,
      middleInitial: sponser.middleInitial || '',
      lastName: sponser.lastName,
      nickName: sponser.nickName,
      sponsorStatus: sponser.sponsorStatus,
      dayOfBirth: sponser.dayOfBirth || '',
      monthOfBirth: sponser.monthOfBirth || '',
      emailAddress: sponser.emailAddress,
      parishId: sponser.parishId,
      coSponserName: sponser.coSponserName || '',
      street: sponser.street,
      appartmentNumber: sponser.appartmentNumber || '',
      city: sponser.city,
      state: sponser.state,
      postalCode: sponser.postalCode || '',
    });
  }
  saveSponsorDetails(sponsorFormvalue) {
    if (this.sponsorForm.valid) {
      console.log('save in component', this.sponsorForm.value);
      this.sponsorService
        .save(this.sponsorForm.value, this.sponser.id).subscribe(
          res =>
          this.isSponsorSaved = true,
          err => this.handleError
        );
    }
  }
  cancel() {
    this.router.navigate(['/sponsor/list']);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
