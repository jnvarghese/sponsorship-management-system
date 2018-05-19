import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Enrollment, Project, Student, Sponsee } from "../../model";
import { StudentService, AdminService } from "../..";

@Component({
  selector: 'app-enroll-sponsee',
  templateUrl: './enroll-sponsee.component.html',
  styleUrls: ['./enroll-sponsee.component.css']
})
export class EnrollSponseeComponent implements OnInit {

  hasAnyStudentSelected = false;
  enroll: Enrollment;
  addMore: boolean;
  message: string;
  studentExceedMessage: string;
  duplicateStudentMessage: string;
  projects: Array<Project>;
  chosenProject: boolean;
  public students: Array<Student>;

  @Input() sponData;
  @Output() sponsee: EventEmitter<Enrollment> = new EventEmitter<Enrollment>();

  constructor(private studentService: StudentService, private adminService: AdminService<Project>) { }

  ngOnInit() {
    console.log('Sponsee Comp. init ', this.enroll);
    console.log('Sponsee Comp. this.sponData ', this.sponData);
    this.addMore = false;
    this.enroll = new Enrollment(
      this.sponData.sponsorId,
      this.sponData.parishId,
      this.sponData.sponsorName,
      this.sponData.paymentDate,
      this.sponData.effectiveDate,
      this.sponData.contributionAmount,
      this.sponData.mode,
      this.sponData.studentCount,
      this.sponData.expirationMonth,
      this.sponData.expirationYear,
      0,
      new Array<Sponsee>()
    );
    this.adminService.getById('/api/admin/parishprojects', this.sponData.parishId)
      .subscribe(data => this.projects = data, err => console.log(err));
  }
  studentFilter = (studentId) => this.enroll.sponsees.find((s) => s.studentId === studentId);

  selectStudent(student: Student) {
   if('manual' === this.enroll.mode){
     if(this.enroll.sponsees.length == this.enroll.studentCount){
      this.studentExceedMessage = `You have exceeded the total number of students for the enrollemnt.
              Please modify the student count !!`;
     }else{
      this.selectStudentManualMode(student);
     }   
   }else if('cruise' === this.enroll.mode){
     this.selectStudentCruiseMode(student);
   }else{
     console.log(' Unsupported Mode.');
   }
  }

  selectStudentCruiseMode(student: Student){
    if (this.hasAnyStudentSelected && !this.addMore) {
      this.studentExceedMessage = `You have exceeded the total number of students for the enrollemnt.
              Please reset if you want to make changes or click next bottom of the page. !!`;
    }else if(this.studentFilter(student.id)){
      this.duplicateStudentMessage= `Duplicate selection, please try a different student. !!`;
    }else {
      this.duplicateStudentMessage = '';
      console.log('Sponsee Comp. selectStudent ', student);
      this.hasAnyStudentSelected = true;
      let dateIncrementor = this.enroll.contributionAmount / 20;
      this.enroll.miscAmount = this.enroll.contributionAmount % 20;
      console.log('dateIncrementor ', dateIncrementor);
      console.log('misc amount ', this.enroll.miscAmount);
      if (dateIncrementor > 12 && this.students.length > 1) {
        this.message = `Mr ${this.enroll.sponsorName}'s, contribution $${this.enroll.contributionAmount}
       exceeds twelve months of sponsorship.
       Would you like to add a anothor student?`;
        this.addMore = true;
      }
      let dateSpliier = this.enroll.effectiveDate.split('/');
      let month = +dateSpliier[0];
      let year = +dateSpliier[2];
      let date = +dateSpliier[1];
      console.log('year ', year);
      console.log('month ', month);
      console.log('date ', date);
      let effectiveDate = this.getEffectiveDate(year, month, date);
      console.log('effectiveDate ', effectiveDate.getDate());
      let incremented = this.incrementDate(dateIncrementor, 'month', effectiveDate);
      console.log('incremented ', incremented);
      let expireDate = this.calculateExpiration(incremented);
      let sponsee = new Sponsee(this.enroll.sponsorId, expireDate[0], expireDate[1], student.id, student.studentName);

      this.enroll.sponsees.push(sponsee);

      if (this.addMore) {
        let sponseeSize = this.enroll.sponsees.length;
        console.log('total available time ', dateIncrementor);
        console.log('total sponsee ', this.enroll.sponsees.length);
        if (this.enroll.sponsees.length > 1) {
          let remianing = dateIncrementor;
          for (let e of this.enroll.sponsees) {
            console.log('decremented sponsee ', sponseeSize)
            console.log(' remianing ', remianing);
            let year = effectiveDate.getDate().getFullYear();
            let month = effectiveDate.getDate().getMonth() - 1;
            let incremented2;
            let expireDate2;
            if (remianing >= 12 && sponseeSize > 1) {
              incremented2 = this.incrementDate(1, 'year', effectiveDate);
              expireDate2 = this.calculateExpiration(incremented2);
            } else if (remianing > 12 || remianing <= 12) {
              incremented2 = this.incrementDate(remianing, 'month', effectiveDate);
              expireDate2 = this.calculateExpiration(incremented2);
              if (remianing <= 12) {
                this.addMore = false
              }
            } else {
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
  }
  selectStudentManualMode(student: Student){
    if(this.studentFilter(student.id)){
      this.duplicateStudentMessage= `Duplicate selection, please try a different student. !!`;
    }else {
      this.duplicateStudentMessage = '';
      console.log('Sponsee Comp. selectStudent ', student);
      this.hasAnyStudentSelected = true;
      this.enroll.miscAmount = this.enroll.contributionAmount % 20;
      let sponsee = new Sponsee(this.enroll.sponsorId, this.enroll.expirationMonth, this.enroll.expirationYear, student.id, student.studentName);
      this.enroll.sponsees.push(sponsee);
    }
  }

  onProjectSelect(value: any) {
    if (value !== "0") {
      this.chosenProject = true;
      this.studentService.search(null, +value, this.enroll.effectiveDate)
        .subscribe(data => this.students = data, err => console.log(err));
    } else {
      this.chosenProject = false;
    }
  }
  next() {
    this.enroll.goto = 'toReview';
    console.log('Enroll Sponsee Next()', this.enroll);
    this.sponsee.emit(this.enroll);
  }
  reset() {
    this.enroll.sponsees = [];
    this.hasAnyStudentSelected = false;
    this.addMore = false;
    this.studentExceedMessage = '';
    this.message = '';
    this.duplicateStudentMessage = '';
    this.sponsee.emit(this.enroll);
  }
  previous() {
    this.enroll.goto = 'toSponsor';
    this.sponsee.emit(this.enroll);
  }

  private getEffectiveDate = (year, month, date) => {
    return {
      getDate: () => {
        return new Date(year, month, date);
      }
    }
  }

  private incrementDate = (incrementer, type, effDate) => {
    let year = effDate.getDate().getFullYear();
    let month = effDate.getDate().getMonth() - 1;
    if (type === 'year') {
      return new Date(year + incrementer, month);
    } else if (type === 'month') {
      return new Date(year, month + incrementer);
    } else {
      return new Date();
    }

  }

  private calculateExpiration = (incremented) => {
    let dtArray = [];
    dtArray[0] = incremented.getMonth() + 1;
    dtArray[1] = incremented.getFullYear();
    return dtArray;
  }
}
