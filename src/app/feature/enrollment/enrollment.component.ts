import { Component, OnInit} from '@angular/core';
import { Enrollment } from '../model/index';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  sponsorSelected: boolean = false;
  sponsorData: any;
  ngOnInit() {

  }

  sponsorInfo(formdata: any) {
    this.sponsorSelected = true;
    this.sponsorData = formdata;
    console.log('EnrollmentComponent.sponsorInfo ', formdata);
  }

  sponseeInfo(e: Enrollment): void {
    if(e.goto === 'toSponsor'){
      this.sponsorSelected = false;
      this.sponsorData = e;
    }else if(e.goto === 'toReview'){

    }else{

    }   
  }
}
