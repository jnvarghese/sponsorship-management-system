import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Enrollment, Student, Sponsee } from '../../model/index';
import { Subscription } from 'rxjs/Subscription';
import { EnrollService, StudentService } from '../../index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-enroll-sponsee',
  templateUrl: './enroll-sponsee.component.html',
  styleUrls: ['./enroll-sponsee.component.css']
})
export class EnrollSponseeComponent implements OnInit, OnDestroy {

  hasAnyStudentSelected: boolean = false;
  enroll: Enrollment;
  subscription: Subscription;
  data: any;
  students: Observable<Array<Student>>;
  private studentSearchTerms = new Subject<string>();
  sponsorSelected:  boolean ;
  @Input() sponData;
  @Output() sponsee: EventEmitter<Enrollment> = new EventEmitter<Enrollment>();
 // @Output() navigate:EventEmitter<string> = new EventEmitter<string>();

  constructor(private enrollService: EnrollService,
    private studentService: StudentService) {
    this.subscription = this.enrollService.getData().subscribe(res => { this.data = res; });
  }

  ngOnInit() {
    
    if(this.sponData.sponsee){
      this.hasAnyStudentSelected = true;
    }
    this.enroll = new Enrollment(this.sponData.sponsorId,
      this.sponData.sponsorName, this.sponData.paymentDate, 
      this.sponData.effectiveDate, 
      this.sponData.contributionAmount);

    this.students = this.studentSearchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.studentService.search(term)
        // or the observable of empty sponsor if no search term
        : Observable.of<Array<Student>>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Array<Student>>([]);
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  searchStudent(term: string): void {
    this.hasAnyStudentSelected = false;
    this.enroll.sponsee = [];
    // Push a search term into the observable stream.
    this.studentSearchTerms.next(term);
  }

  selectStudent(student: Student) {
    this.students = null;
    this.hasAnyStudentSelected = true;
    let dateIncrementor = this.enroll.contributionAmount / 20;
    let dateSpliier = this.enroll.effectiveDate.split('/');
    let month = +dateSpliier[1];
    let year = +dateSpliier[2];
    let effectiveDate = this.getEffectiveDate(year, month);
    let incremented = this.incrementDate(dateIncrementor, 'month', effectiveDate);
    let expireDate = this.calculateExpiration(incremented);
    let sponsee = new Sponsee(this.enroll.sponsorId, expireDate[0], expireDate[1], student.id, student.firstName);
    this.enroll.sponsee.push(sponsee);  
  }

  next() {
    this.enroll.goto = 'toReview';
    this.sponsee.emit(this.enroll);
  }

  previous(){
    this.enroll.goto = 'toSponsor';
    this.sponsee.emit(this.enroll);
  }
  private getEffectiveDate = (year, month) => {
    return {
      getDate: () => {
        return new Date(year, month);
      }
    }
  }

  private incrementDate = (incrementer, type, effDate) => {
    let year = effDate.getDate().getFullYear();
    let month = effDate.getDate().getMonth() - 1;
    if (type === 'year') {
      return new Date(year + incrementer, month)
    } else if (type === 'month') {
      return new Date(year, month + incrementer)
    } else {
      return new Date();
    }

  }

  private calculateExpiration = (incremented) => {
    let dtArray = [];
    dtArray[0] = incremented.getMonth() + 1
    dtArray[1] = incremented.getFullYear()
    return dtArray

  }

}
