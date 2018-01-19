import { Component, OnInit, Input } from '@angular/core';
import { Enrollment } from '../../model/index';

@Component({
  selector: 'app-enroll-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() sponData;
  enroll: Enrollment;

  constructor() { }

  ngOnInit() {
    if (this.sponData) {
      this.enroll = new Enrollment(
        this.sponData.sponsorId,
        this.sponData.sponsorName,
        this.sponData.paymentDate,
        this.sponData.effectiveDate,
        this.sponData.contributionAmount,
        this.sponData.sponsee);
    }
  }
}
