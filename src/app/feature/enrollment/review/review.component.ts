import { Component, OnInit, Input } from '@angular/core';
import { Enrollment } from '../../model/index';
import { EnrollService } from '../../index';
import { DateFormatPipe } from '../../../shared/date.format.pipe';

@Component({
  selector: 'app-enroll-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() sponData;
  enroll: Enrollment;

  constructor(private enrollService: EnrollService, private datePipe: DateFormatPipe) { }

  ngOnInit() {
    console.log('Review Component oninit spondata', this.sponData)
    if (this.sponData) {
      this.enroll = new Enrollment(
        this.sponData.sponsorId,
        this.sponData.sponsorName,
        this.sponData.paymentDate,
        this.sponData.effectiveDate,
        this.sponData.contributionAmount,
        this.sponData.miscAmount,
        this.sponData.sponsees);
    }
  }

  submit(){
  this.enroll.effectiveDate = this.datePipe.transform(this.enroll.effectiveDate, 'toDB');
  this.enroll.paymentDate = this.datePipe.transform(this.enroll.paymentDate, 'toDB');
   this.enrollService.save(this.enroll).then(data =>{
    console.log(data);
   }).catch(err =>{
    console.log(err);
   })
  }
}
