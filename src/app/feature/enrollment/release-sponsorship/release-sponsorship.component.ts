import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Project, Student, StudentSummary, Parish, Sponsor } from '../../model';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { AdminService } from '../../shared/service/admin.service';
import { StudentService } from '../../shared/service/student.service';
import { SponsorService } from '../../shared/service/sponsor.service';
import { Substitute } from '../../model/substitute';
import { SubstitutionService } from '../../shared/service/substitution.service';
import { saveAs as importedSaveAs } from "file-saver";

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

  selectedAgencyKey: number; 

  selectedProjectKey: string;

  agencyWise: any;

  projectWise: any;

  dataAvailable: boolean;

  displayStudentsSummary: boolean;

  studentSummary: StudentSummary;

  inactiveSelectedStudent:number; // in active student id

  enrollmentSummaries: Array<StudentSummary>;

  tobeReplacedStudentId: number; // new student selecting using radio button

  private parishSearchTerms = new Subject<string>();

  private sponsorSearchTerms = new Subject<string>();

  parishes: Array<Parish>;

  sponsors: Array<Sponsor>;

  existingStudents: Array<Student>;

  availableStudents: Array<Student>;

  selectedParish: Parish;

  selectedParishId: number;

  selectedSponsor: Sponsor;

  selectedSponsorId: number;

  studentSelectedForSubstitution: number;

  selectedSubstitutingStudent: number;

  substitutionStudentProjectId: number;

  enrollmentId: number;

  displayAvailableStudentsButton: boolean;

  readyToCompleteSubstitution: boolean;

  substitutionFlag: string;

  substitutions: Array<Substitute>;


  @ViewChild('parishSearchBox') parishSearchBox: ElementRef;
  @ViewChild('sponsorSearchBox') sponsorSearchBox: ElementRef;

  reset(){
    this.selectedParishId = undefined;
    this.selectedSponsorId = undefined;
    this.selectedParish = undefined;
    this.selectedSponsor = undefined;
    this.existingStudents = undefined;
    this.studentSelectedForSubstitution = undefined;
    this.substitutionStudentProjectId = undefined;
    this.enrollmentId = undefined;
    this.substitutionFlag = undefined;
    this.selectedSubstitutingStudent = undefined;
    this.readyToCompleteSubstitution = false;
    this.displayAvailableStudentsButton = false;
    this.parishSearchBox.nativeElement.value = '';
    this.sponsorSearchBox.nativeElement.value = '';
    this.existingStudents = undefined;
    this.availableStudents = undefined;
  }


  constructor(private commonService: AdminService<Project>, 
    private parishService: AdminService<Parish>,
    private sponsorService: SponsorService<Sponsor>,
    private studentService: StudentService,
    private substitutionService: SubstitutionService<Substitute>) { }

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
    
    this.parishSearchTerms.pipe(   
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term => {
          return term // switch to new observable each time
            ? // return the http search observable
            this.parishService.search('/api/admin/parishes', term)
            : // or the observable of empty heroes if no search term
            of<Parish[]>([])
        }

      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<Parish[]>([]);
      })
    ).subscribe(res => this.parishes = res);

    this.sponsorSearchTerms.pipe(   
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term => {
          return term // switch to new observable each time
            ? // return the http search observable
            this.sponsorService.searchByParishId(this.selectedParishId, term)
            : // or the observable of empty heroes if no search term
            of<Sponsor[]>([])
        }

      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<Sponsor[]>([]);
      })
    ).subscribe(res => this.sponsors = res);

  }

  listAvailableStudents(){
    this.studentService.getAvailableStudentsByProject(this.substitutionStudentProjectId).subscribe(
      response => this.availableStudents = response,
      err => console.error(`Error is getting available students `)
    )
  }
  generateSubstitution(substitution: Substitute){
    const sponsorName = substitution.firstName+" "+substitution.middleInitial+" "+substitution.lastName;
    this.substitutionService.generateLetter(substitution.enrollmentId, substitution.oldStudentId, substitution.newStudentId).subscribe(
      blob => {
        importedSaveAs(blob, `${sponsorName.toString()}-Substitution Letter`);
      },
      () =>{
        console.log(' Downloaded. '); 
      }
    );
  }
  
  onStudentRadioSelect(studentId: number){
    this.tobeReplacedStudentId = studentId;
  }

  swapSponsorship() {
    console.log(` Student ${this.inactiveSelectedStudent} will be replaced with ${this.tobeReplacedStudentId}`) // swap with
    //sourceStudent, targetStudent, enrollmentId
    this.studentService.swapStudent(this.inactiveSelectedStudent, this.tobeReplacedStudentId, this.studentSummary.enrollmentId, '').subscribe(
      data => this.substitutionFlag = 'Successfully compeleted student substitution.',
      err => console.error(' Error in swapping the students')
    )
  }
 
  onStudentSelectedForSubstitution(studentId: number, projectId: number, enrollmentId: number){
    console.log(` projectId ${projectId} studentId ${studentId} `)
    this.studentSelectedForSubstitution = studentId;
    this.substitutionStudentProjectId = projectId;
    this.enrollmentId = enrollmentId;
    this.displayAvailableStudentsButton = true
    this.availableStudents = undefined;
  }
  searchParish(term: string): void {
    this.parishSearchTerms.next(term);
    this.substitutionFlag = undefined;
  }
  searchSponsor(term: string): void {
    this.sponsorSearchTerms.next(term);
    this.existingStudents = [];
  }
  
  setParish(p: Parish) {
    this.selectedParish = p;
    this.selectedParishId = p.id
    this.parishes = [];
  }

  listLetters() {
    this.substitutionService.list().subscribe(
      data => this.substitutions = data,
      erro => console.error('Error in listing substitutions')
    )
  }

  listStudents(s: Sponsor){
    this.sponsors = [];
    this.selectedSponsor = s;
    this.sponsorService.getEnrolledStudentsBySponsorId(s.id).subscribe(
      response => this.existingStudents = response,
      err => console.error(`Error in getting getEnrolledStudentsBySponsorId by ${s.id}`)
    )
    console.log(s.id)
  }

  onStudentSelectedForReplacement(studentId: number){
    this.selectedSubstitutingStudent = studentId;
    this.readyToCompleteSubstitution = true;
  }
  
  completeSubstitution(reason: string){
    this.studentService.swapStudent(
      this.studentSelectedForSubstitution, 
      this.selectedSubstitutingStudent, 
      this.enrollmentId,
      reason)
      .subscribe(
       data => {
         this.reset();
         this.substitutionFlag = 'Successfully compeleted student substitution.';
        },
       err => console.error(' Error in swapping the students')
    )
  }

  onAgencySelect(prjArray: any, agencyKey: number) {
    this.selectedAgencyKey = agencyKey;
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
