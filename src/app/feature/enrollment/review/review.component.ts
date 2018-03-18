import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Enrollment } from '../../model/index';
import { EnrollService } from '../../index';
import { DateFormatPipe } from '../../../shared/date.format.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enroll-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() sponData;
  @Output() sponsee: EventEmitter<Enrollment> = new EventEmitter<Enrollment>();
  enroll: Enrollment;
  error: any;

  constructor(
    private router: Router,
    private enrollService: EnrollService,
    private datePipe: DateFormatPipe) { }

  ngOnInit() {
    console.log('Review Component oninit spondata', this.sponData)
    if (this.sponData) {
      this.enroll = new Enrollment(
        this.sponData.sponsorId,
        this.sponData.parishId,
        this.sponData.sponsorName,
        this.sponData.paymentDate,
        this.sponData.effectiveDate,
        this.sponData.contributionAmount,
        this.sponData.miscAmount,
        this.sponData.sponsees);
    }
  }

  submit() {
    this.enroll.effectiveDate = this.datePipe.transform(this.enroll.effectiveDate, 'toDB');
    this.enroll.paymentDate = this.datePipe.transform(this.enroll.paymentDate, 'toDB');
    this.enrollService.save(this.enroll).subscribe(
      data => {
        this.enroll.goto = 'home';
        this.sponsee.emit(this.enroll);       
      },
      err => this.handleError       
    )
  }
//  this.router.navigate(['/'])
  private handleError(error: any): Promise<any> {
    this.error = error
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  previous() {
    this.enroll.goto = 'toStudent';
    this.sponsee.emit(this.enroll);
  }
}
