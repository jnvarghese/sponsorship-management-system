import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Project, Student, StudentSummary } from '../../model';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { AdminService } from '../../shared/service/admin.service';
import { StudentService } from '../../shared/service/student.service';

@Component({
  selector: 'app-release-sponsorship',
  templateUrl: './release-sponsorship.component.html',
  styleUrls: ['./release-sponsorship.component.css']
})
export class ReleaseSponsorshipComponent implements OnInit {

  @ViewChild('studentSearchBox') studentSearch: ElementRef;

  private projectSearchTerms = new Subject<string>();

  private studentSearchTerms = new Subject<string>();

  students: Observable<Array<Student>>;

  projects: Observable<Array<Project>>;

  displayStudentDetails: boolean;

  student: Student;

  studentsArray: Array<Student>;

  activeInActiveStudents: Array<StudentSummary>;

  selectedProjectKey: string;

  agencyWise: any;

  projectWise: any;

  dataAvailable: boolean;

  displayStudentsSummary: boolean;

  studentSummary: StudentSummary;

  inactiveSelectedStudent:number; // in active student id

  enrollmentSummaries: Array<StudentSummary>;

  tobeReplacedStudentId: number; // new student selecting using radio button

  constructor(private commonService: AdminService<Project>, private studentService: StudentService) { }

  objectKeys = Object.keys;

  ngOnInit(): void {

    this.studentService.activeInactive().subscribe(
      data => {
        this.agencyWise = data.reduce((acc, d) => {
          acc[d.agencyName] = acc[d.agencyName] || []
          acc[d.agencyName].push({
            studentId: d.studentId,
            studentCode: d.studentCode,
            projectId: d.projectId,
            projectName: d.projectName,
            uniqueId: d.uniqueId,
            studentName: d.studentName,
            gender: d.gender,
            grade: d.grade,
            nameOfGuardian: d.nameOfGuardian,
            occupationOfGuardian: d.occupationOfGuardian,
            dateOfBirth: d.dateOfBirth,
            maxout: d.maxout,
            days: d.days,
            sponsorfirstName: d.sponsorfirstName,
            sponsorCode: d.sponsorCode,
            sponsorMiddleInitial: d.sponsorMiddleInitial,
            sponsorLastName: d.sponsorLastName,
            sponsorId: d.sponsorId,
            parishName: d.parishName,
            parishCity: d.parishCity,
            parishId: d.parishId,
            enrollmentId: d.enrollmentId
          })
          return acc;
        }, {})
        this.dataAvailable = true;
      }
      //this.activeInActiveStudents = data
      ,
      err => console.log(`Error in component ... ${err}`)
    );
    
    this.students = this.studentSearchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term =>
          term // switch to new observable each time
            ? // return the http search observable
            this.studentService.searchByParishAndName(this.studentSummary.parishId ,term)
            : // or the observable of empty heroes if no search term
            of<Student[]>([])
      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<Student[]>([]);
      })
    );
  }

  onStudentRadioSelect(studentId: number){
    this.tobeReplacedStudentId = studentId;
  }

  swapSponsorship() {
    console.log(` Student ${this.inactiveSelectedStudent} will be replaced with ${this.tobeReplacedStudentId}`) // swap with
    //sourceStudent, targetStudent, enrollmentId
    this.studentService.swapStudent(this.inactiveSelectedStudent, this.tobeReplacedStudentId, this.studentSummary.enrollmentId).subscribe(
      data => console.log('Success'),
      err => console.error(' Error in swapping the students')
    )
  }
  /*
  searchProject(term: string): void {
    // Push a search term into the observable stream.
    this.projectSearchTerms.next(term);
  } */

  onAgencySelect(prjArray: any) {
    this.projectWise = prjArray.reduce((acc, d) => {
      acc[d.projectName] = acc[d.projectName] || []
      acc[d.projectName].push({
        studentId: d.studentId,
        studentCode: d.studentCode,
        projectId: d.projectId,
        uniqueId: d.uniqueId,
        studentName: d.studentName,
        gender: d.gender,
        grade: d.grade,
        nameOfGuardian: d.nameOfGuardian,
        occupationOfGuardian: d.occupationOfGuardian,
        dateOfBirth: d.dateOfBirth,
        maxout: d.maxout,
        days: d.days,
        sponsorfirstName: d.sponsorfirstName,
        sponsorCode: d.sponsorCode,
        sponsorMiddleInitial: d.sponsorMiddleInitial,
        sponsorLastName: d.sponsorLastName,
        sponsorId: d.sponsorId,
        parishName: d.parishName,
        parishCity: d.parishCity,
        parishId: d.parishId,
        enrollmentId: d.enrollmentId
      })
      return acc;
    }, {})
  }

  oProjectSelect(students: any, projectKey: any) {
    this.activeInActiveStudents = [];
    this.selectedProjectKey = projectKey;
    this.displayStudentsSummary = true;
    this.activeInActiveStudents = students;
  }

  onStudentSumamrySelect(studentSumamry: StudentSummary){
    this.inactiveSelectedStudent = studentSumamry.studentId;
    this.studentSummary = studentSumamry;
    console.log(studentSumamry);
    this.studentService.enrollmentBySponsorId(+studentSumamry.sponsorId).subscribe(
      data => this.enrollmentSummaries = data,
      err =>  console.log(`Error in component ... ${err}`)
    )
    this.studentService.searchByParish(+studentSumamry.parishId).subscribe(
      data => this.studentsArray = data,
      err =>  console.log(`Error in component whiel searching student by project id... ${err}`)
    )
  }

  searchStudent(term: string): void {
    // Push a search term into the observable stream.
    console.log(' term', term)
    if (term.length >= 3)
      this.studentSearchTerms.next(term);
  }

  onStudentSelect(student: Student): void {
    this.studentSearch.nativeElement.value = "";
    this.studentSearchTerms.next('');
    this.displayStudentDetails = true
    this.student = student;
  }

  sortByStudentName() {
    this.activeInActiveStudents.sort((m1, m2) => {
      if (m1.studentName > m2.studentName) return 1;
      if (m1.studentName === m2.studentName) return 0;
      if (m1.studentName < m2.studentName) return -1;
    });
  }
  sortBySponsorName() {
    this.activeInActiveStudents.sort((m1, m2) => {
      if (m1.sponsorfirstName > m2.sponsorfirstName) return 1;
      if (m1.sponsorfirstName === m2.sponsorfirstName) return 0;
      if (m1.sponsorfirstName < m2.sponsorfirstName) return -1;
    });
  }
  sortBySponsorCode() {
    this.activeInActiveStudents.sort((m1, m2) => {
      if (m1.sponsorCode > m2.sponsorCode) return 1;
      if (m1.sponsorCode === m2.sponsorCode) return 0;
      if (m1.sponsorCode < m2.sponsorCode) return -1;
    });
  }
  sortByParishName() {
    this.activeInActiveStudents.sort((m1, m2) => {
      if (m1.parishName > m2.parishName) return 1;
      if (m1.parishName === m2.parishName) return 0;
      if (m1.parishName < m2.parishName) return -1;
    });
  }
}
