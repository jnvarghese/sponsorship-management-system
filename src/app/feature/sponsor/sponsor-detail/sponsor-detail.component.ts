import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sponsorService: SponsorService<Sponsor>) { }

  addSponsorForm: FormGroup;
  address: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  emailAddress = new FormControl('', [Validators.required,Validators.email]);
  dateOfBirth = new FormControl();
  middleInitial = new FormControl();
  //http://plnkr.co/edit/mWhYtc2nf8hSHFbLWlEx?p=preview
  hasAnyCoSponser = new FormControl(); //new FormControl('', Validators.required);
  street = new FormControl('', Validators.required);
  appartmentNumber = new FormControl();
  city = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  postalCode = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]);
  // gender = new FormControl(Validators.required);

  ngOnInit() {  
    this.address = new FormGroup({
      street: this.street,
      appartmentNumber: this.appartmentNumber,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode
    });
    this.addSponsorForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      middleInitial: this.middleInitial,
      dateOfBirth: this.dateOfBirth,
      emailAddress: this.emailAddress,
      hasAnyCoSponser: this.hasAnyCoSponser,
      address: this.address
    });
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.sponsorService.findSponsor(id)
          .then(res => this.sponser = res[0])
      } else {
        this.navigated = false;
        this.sponser = new Sponsor();
      }
    });
  }

  saveSponsorDetails(sponsorFormvalue) {
    if (this.addSponsorForm.valid) {
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
