import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Enrollment, Project, Student, Sponsee } from "../../model";
import { StudentService, AdminService } from "../..";
import * as moment from 'moment';

@Component({
  selector: 'app-enroll-sponsee',
  templateUrl: './enroll-sponsee.component.html',
  styleUrls: ['./enroll-sponsee.component.css']
})
export class EnrollSponseeComponent implements OnInit {

  hasAnyStudentSelected = false;
  hasAnyActiveEnrollments = false;
  enroll: Enrollment;
  addMore: boolean;
  message: string;
  studentExceedMessage: string;
  duplicateStudentMessage: string;
  projects: Array<Project>;
  chosenProject: boolean;
  public students: Array<Student>;
  public studentsCopy: Array<Student>;

  @Input() sponData: { enrollmentId: number; sponsorId: number; parishId: number; sponsorName: string; paymentDate: string; effectiveDate: string; contributionAmount: number; mode: string; studentCount: number; expirationMonth: number; expirationYear: number; };
  @Output() sponsee: EventEmitter<Enrollment> = new EventEmitter<Enrollment>();

  constructor(private studentService: StudentService, private adminService: AdminService<Project>) { }

  ngOnInit() {
   
    this.addMore = false;
    this.enroll = new Enrollment(
      this.sponData.enrollmentId,
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
    if(this.sponData.enrollmentId) {
      this.hasAnyActiveEnrollments = true
      this.getStudentByEnrollmentId(this.sponData.enrollmentId)
    } else {
      this.getProjects(this.sponData.parishId);
    }
  }

  getProjects =(parishId: number) =>{
    this.adminService.getById('/api/admin/parishprojects', parishId)
    .subscribe(data => this.projects = data, err => console.log(err));
  }

  studentFilter = (studentId: number) => this.enroll.sponsees.find((s) => s.studentId === studentId);

  selectStudent(student: Student, index: number) {
    console.log(' index ', index);
   if('manual' === this.enroll.mode){
     if(this.enroll.sponsees.length == this.enroll.studentCount){
      this.studentExceedMessage = `You have exceeded the total number of students for the enrollemnt.
              Please modify the student count !!`;
     }else{
      this.selectStudentManualMode(student, index);
     }   
   }else if('cruise' === this.enroll.mode){
     this.selectStudentCruiseMode(student, index);
   }else{
     console.log(' Unsupported Mode.');
   }
  }

  selectStudentCruiseMode(student: Student, index: number){
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
      let effectiveDate;
      if(student.maxOut && student.maxOut !== null){
        let dateSplitter =  student.maxOut.split('/');
        console.log( ` ${dateSplitter} inside modify enrollment`)
        effectiveDate = this.getEffectiveDate(+dateSplitter[2], +dateSplitter[0], +dateSplitter[1]);
      } else {
        let dateSplitter = this.enroll.effectiveDate.split('/');
        console.log( ` ${dateSplitter} inside new enrollment`)
        effectiveDate = this.getEffectiveDate(+dateSplitter[2], (+dateSplitter[0])-1, +dateSplitter[1]);
      }
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
            let incremented2: Date;
            let expireDate2: any[] | number[];
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
      this.students = this.students.filter( st => st.id !== student.id);
    }
  }
  selectStudentManualMode(student: Student, index: number){
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
  sortByGender() {
    this.students.sort((m1, m2) => {
      if (m1.gender > m2.gender) return 1;
      if (m1.gender === m2.gender) return 0;
      if (m1.gender < m2.gender) return -1;
    });
  }

  sortByGrade(){
    this.students.sort((m1, m2) => {
      if (m1.grade > m2.grade) return 1;
      if (m1.grade === m2.grade) return 0;
      if (m1.grade < m2.grade) return -1;
    });
  }

  sortByName(){
    this.students.sort((m1, m2) => {
      if (m1.studentName > m2.studentName) return 1;
      if (m1.studentName === m2.studentName) return 0;
      if (m1.studentName < m2.studentName) return -1;
    });
  }

  onProjectSelect(value: any) {
    if (value !== "0") {
      this.chosenProject = true;
      this.getUnEnrolledStudents(this.enroll.parishId, +value);
    } else {
      this.chosenProject = false;
    }
  }

  getUnEnrolledStudents = (parishId: number, projectId: number) => {
    this.studentService.getByParishAndProject(parishId, projectId)
    .subscribe(data => {
      this.students = data;
      this.studentsCopy = data.slice(0, data.length+1);
    }, err => console.log(err));
  }

  getStudentByEnrollmentId = (enrollmentId: number) => {
    this.studentService.listByEnrollmentId(enrollmentId)
    .subscribe(data => {
      this.students = data;
      this.studentsCopy = data.slice(0, data.length+1);
    }, err => console.log(err));
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
    this.students = this.studentsCopy;
  }
  previous() {
    this.enroll.goto = 'toSponsor';
    this.sponsee.emit(this.enroll);
  }

  private getEffectiveDate = (year: number, month: number, date: number) => {
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

  private calculateExpiration = (incremented: { getMonth: () => number; getFullYear: () => void; }) => {
    let dtArray = [];
    dtArray[0] = incremented.getMonth() + 1;
    dtArray[1] = incremented.getFullYear();
    return dtArray;
  }
}
