import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.css']
})
export class SponsorDetailComponent implements OnInit {

  isSponsorSaved: boolean;

  constructor(private router: Router) { }
  addSponsorForm: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  dateOfBirth = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  // gender = new FormControl(Validators.required);

  ngOnInit() {
    this.addSponsorForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      address: this.address,
      // gender: this.gender
    });
  }

  saveSponsorDetails(sponsorFormvalue) {
    if (this.addSponsorForm.valid) {
      this.isSponsorSaved = true;
    }
  }
  cancel() {
    this.router.navigate(['/sponsors']);
  }
}
