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

  @Input() sponser: Sponsor;
  error: any;
  navigated = false; // true if navigated here
  isSponsorSaved: boolean;
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

  //http://plnkr.co/edit/mWhYtc2nf8hSHFbLWlEx?p=preview

  ngOnInit() {
    this.createForm()
    let sponsorId = this.route.snapshot.params['id'];
    if (sponsorId !== undefined) {
      const id = +sponsorId;
      this.navigated = true;
      this.sponsorService.findSponsor(id)
        .then(res => {
          this.sponser = res;
          this.pupulateForm(this.sponser);
        })
    } else {
      this.navigated = false;
      this.sponser = new Sponsor();
    }

    this.adminService.get('/api/admin/parishes')
    .then(data => this.parishes = data)
    .catch(err => console.log(err));
  }
  createForm() {
    this.sponsorForm = this.fb.group({
      firstName: ['', Validators.required],
      middleInitial: '',
      lastName: ['', Validators.required],
      dayOfBirth: ['', Validators.required],
      monthOfBirth: ['', Validators.required],
      emailAddress: [''],
      coSponserName: '',
      parishCode: '0',
      sponsorStatus: '',
      street: '',
      appartmentNumber: '',
      city: '',
      state: '',
      postalCode: '',
    });
  }
  pupulateForm(sponser: Sponsor) {
    this.selectedParishId = sponser.parishId;
    this.sponsorForm.setValue({
      firstName: sponser.firstName,
      middleInitial: sponser.middleInitial || '',
      lastName: sponser.lastName,
      sponsorStatus: sponser.sponsorStatus,
      dayOfBirth: sponser.dayOfBirth || '',
      monthOfBirth: sponser.monthOfBirth || '',
      emailAddress: sponser.emailAddress,
      parishCode: sponser.parishId,
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
      this.sponsorService
        .save(this.sponsorForm.value, this.sponser.id, this.sponser.parishId)
        .then(response => {
          this.isSponsorSaved = true;
        })
        .catch(error => {
          this.error = error
          this.isSponsorSaved = false;
        }); // TODO: Display error message  

    }
  }
  cancel() {
    this.router.navigate(['/sponsors']);
  }
}
