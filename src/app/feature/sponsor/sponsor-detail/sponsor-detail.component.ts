import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sponsor } from '../../model/index';
import { Component, Input, OnInit } from '@angular/core';
import { SponsorService } from '../../shared/service/sponsor.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sponsorService: SponsorService<Sponsor>,
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
  }
  createForm() {
    this.sponsorForm = this.fb.group({
      firstName: ['', Validators.required],
      middleInitial: '',
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      birthMonth: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      coSponserName: '',
      parishCode: '0',
      sponsorStatus: '',
      street: ['', Validators.required],
      appartmentNumber: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });
  }
  pupulateForm(sponser: Sponsor) {
    this.sponsorForm.setValue({
      firstName: sponser.firstName,
      middleInitial: sponser.middleInitial || '',
      lastName: sponser.lastName,
      sponsorStatus: '',
      dateOfBirth: sponser.dayMonth || '',
      birthMonth: sponser.dayMonth || '',
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
        .save(this.sponser)
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
