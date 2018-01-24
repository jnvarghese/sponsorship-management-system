import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
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
export class EnrollSponseeComponent implements OnInit {

  hasAnyStudentSelected: boolean = false;
  enroll: Enrollment;
  addMore: boolean;
  message: string;
  students: Observable<Array<Student>>;
  private studentSearchTerms = new Subject<string>();

  @Input() sponData;
  @Output() sponsee: EventEmitter<Enrollment> = new EventEmitter<Enrollment>();
  @ViewChild('studentSearchBox') containerEl: ElementRef;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    console.log('Sponsee Comp. init ', this.enroll);
    this.addMore = false;
    
    this.enroll = new Enrollment(
      this.sponData.sponsorId,
      this.sponData.sponsorName, 
      this.sponData.paymentDate, 
      this.sponData.effectiveDate, 
      this.sponData.contributionAmount
    );

    this.students = this.studentSearchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.studentService.search(term, this.enroll.effectiveDate)
        // or the observable of empty sponsor if no search term
        : Observable.of<Array<Student>>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Array<Student>>([]);
      });
  }

  searchStudent(term: string): void {
    if (!this.enroll.sponsees){
      this.hasAnyStudentSelected = false;
      this.enroll.sponsees = [];
    }
    // Push a search term into the observable stream.
    this.studentSearchTerms.next(term);
  }

  selectStudent(student: Student) {
    console.log('Sponsee Comp. selectStudent ', student);
    this.containerEl.nativeElement.value = '';
    //this.studentSearchTerms.next();
    this.hasAnyStudentSelected = true;
    let dateIncrementor = this.enroll.contributionAmount / 20;
    this.enroll.miscAmount = this.enroll.contributionAmount % 20;
    console.log( 'dateIncrementor ', dateIncrementor);
    console.log( 'misc amount ', this.enroll.miscAmount);
    if(dateIncrementor > 12){
       this.message = `Mr ${this.enroll.sponsorName}'s, contribution $${this.enroll.contributionAmount}
       exceeds twelve months of sponsorship.
       Would you like to add a anothor student?`;
       this.addMore = true;
    }
    let dateSpliier = this.enroll.effectiveDate.split('/');
    let month = +dateSpliier[1];
    let year = +dateSpliier[2];
    let effectiveDate = this.getEffectiveDate(year, month);
    let incremented = this.incrementDate(dateIncrementor, 'month', effectiveDate);
    let expireDate = this.calculateExpiration(incremented);
    let sponsee = new Sponsee(this.enroll.sponsorId, expireDate[0], expireDate[1], student.id, student.firstName);
   /* let computedDate = new Date(expireDate[1], expireDate[0]-1, 1, 0, 0, 0, 0);
          let sponsorValidityDate = new Date(student.expirationYear, student.expirationMonth-1, 1, 0, 0, 0, 0);
          console.log(' computedDate', computedDate )
          console.log(' sponsorValidityDate', sponsorValidityDate )
          console.log( 'compare ', effectiveDate.getDate().getTime() <= sponsorValidityDate.getTime());*/

    this.enroll.sponsees.push(sponsee);  

    if(this.addMore){
      let sponseeSize = this.enroll.sponsees.length;
      console.log( 'total available time ', dateIncrementor)
      console.log('total sponsee ', this.enroll.sponsees.length)
      if(this.enroll.sponsees.length > 1){
        let remianing = dateIncrementor;
        for (let e of this.enroll.sponsees){   
         console.log('decremented sponsee ', sponseeSize)
         console.log (' remianing ', remianing);
          let year = effectiveDate.getDate().getFullYear();
          let month = effectiveDate.getDate().getMonth() - 1;     
          let incremented2;
          let expireDate2;          
          if(remianing >= 12 && sponseeSize > 1){
            incremented2 = this.incrementDate(1, 'year', effectiveDate);
            expireDate2 = this.calculateExpiration(incremented2);         
          }else if(remianing > 12 || remianing <= 12){
            incremented2 = this.incrementDate(remianing, 'month', effectiveDate);
            expireDate2 = this.calculateExpiration(incremented2);     
            if(remianing <= 12){
              this.addMore = false    
            }       
          }else{
            this.addMore = false       
          }
          e.expirationMonth = expireDate2[0];
          e.expirationYear = expireDate2[1];
          
          remianing = remianing - 12;

          sponseeSize = --sponseeSize; 
        }       
      }
    }

  }

  next() {
    this.enroll.goto = 'toReview';
    console.log('Enroll Sponsee Next()', this.enroll)
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
