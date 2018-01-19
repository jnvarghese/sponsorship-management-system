import { Component, OnInit} from '@angular/core';
import { Enrollment } from '../model/index';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  displayReview: boolean;
  displaySponsee: boolean;
  displaySponsor: boolean;
  sponsorData: any;
  
  ngOnInit() {
    this.displaySponsor = true;
    this.displaySponsee = false;
    this.displayReview = false;
  }
  
  sponsorInfo(formdata: any) {
   this.displaySponsor = false;
   this.displaySponsee = true;
   this.displayReview = false;
   this.sponsorData = formdata;
   console.log('EnrollmentComponent.sponsorInfo ', formdata);
  }

  sponseeInfo(e: Enrollment): void {
    if(e.goto === 'toSponsor'){
      this.displaySponsor = true;
      this.displaySponsee = false;
      this.displayReview = false;
    } else if(e.goto === 'toReview'){
      this.displaySponsor = false;
      this.displaySponsee = false;
      this.displayReview = true;
    } else{

    }  
    this.sponsorData = e; 
  }
}
