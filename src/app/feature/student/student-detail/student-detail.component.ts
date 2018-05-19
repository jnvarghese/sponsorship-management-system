import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../shared/service/student.service';
import { Student, Project } from '../../model/index';
import { AdminService } from '../../shared/service/admin.service';
import { ValidatorService } from '../../../shared/validator.service';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() student: Student;
  studentForm: FormGroup;
  error: any;
  navigated = false; // true if navigated here
  fileUploadStatus: boolean;
  filesToUpload: File;
  selectedProjectId: any;
  selectedGender: any;
  projects: Array<Project>;
  isStudentSaved = false;
  pageHeader: string;
  pageSubHeader: string;
  displayUpload: boolean = false;
  imageLinkRef: string;
  chosenProject: boolean = false;
  sequence: number;

  genders = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'O', label: 'Other' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private commonService: AdminService<Project>,
    private fb: FormBuilder, private validatorService: ValidatorService) {
  }

  ngOnInit() {
    this.pageHeader = 'Add new student';
    this.pageSubHeader = 'create';
    this.commonService.get(`/api/admin/projects`)
      .subscribe(
        data => this.projects = data,
        error => error => this.handleError
      );
    this.createForm();
    const studentId = this.route.snapshot.params['id'];
    if (studentId !== undefined) {
      this.pageHeader = 'Modify student';
      this.pageSubHeader = 'modify';
      const id = +studentId;
      this.navigated = true;
      this.displayUpload = true;
      this.populateForm(id);
    } else {
      this.navigated = false;
      this.student = new Student();
    }
  }

  createForm() {
    this.studentForm = this.fb.group({
      id: '',
      studentName: [null, Validators.required],
      studentCode: [null, Validators.required],//new FormControl({value: null, disabled: true}),
      status: 0,
      dateOfBirth: [null, [Validators.required, this.validatorService.validateDate]],
      address: '',
      gender: [null, Validators.required],
      projectId: [null, Validators.required],
      hobbies: '',
      talent: '',
      recentAchivements: '',
      nameOfGuardian: '',
      occupationOfGuardian: '',
      baseLanguage: '',
      grade: '',
      favColor: '',
      favGame: ''
    });
  }
  populateForm(id: number) {
    this.studentService.findStudent(id)
      .subscribe(
        student => {
          console.log(' edit - student ', student);
          this.student = student;
          this.getSequence(+this.student.projectId, false);
          this.selectedProjectId = this.student.projectId;
          this.selectedGender = this.student.gender;
          this.imageLinkRef = this.student.imageLinkRef;
          return this.studentForm.setValue({
            id: this.student.id,
            studentName: this.student.studentName,
            studentCode: this.student.studentCode,
            dateOfBirth: this.student.dateOfBirth || '',
            address: this.student.address || '',
            status: this.student.status || '',
            gender: this.student.gender,
            projectId: this.student.projectId,
            hobbies: this.student.hobbies || '',
            talent: this.student.talent || '',
            recentAchivements: this.student.recentAchivements || '',
            nameOfGuardian: this.student.nameOfGuardian || '',
            occupationOfGuardian: this.student.occupationOfGuardian || '',
            baseLanguage: this.student.baseLanguage || '',
            grade: this.student.grade || '',
            favColor: this.student.favColor || '',
            favGame: this.student.favGame || ''
          });
        },
        error => error => this.handleError
      );
  }
  saveStudent(): void {
    if (this.studentForm.valid) {
      let stdCode = +this.studentForm.get('studentCode').value;
      if (stdCode > this.sequence) {
        this.studentService
          .save(this.studentForm.value)
          .subscribe(
            response => {
              console.log(' response ', response);
              this.isStudentSaved = true;
              this.displayUpload = true;
              this.student = response
            },
            error => this.handleError,
            () => console.log("Subsribtion Completed !")
          );
      } else {
        this.error = `Student code should be greater than ${this.sequence}`;
        console.error('err');
      }

    }
  }
  handleFileInput(fileInput: any) {
    this.filesToUpload = fileInput.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!this.filesToUpload.type.match(pattern)) {
      console.error('File is not an image');
      //of course you can show an alert message here
      this.filesToUpload = null;
      return;
    }
  }
  onProjectSelect(value: any) {
    if (value !== "0") {
      this.chosenProject = true;
      this.getSequence(+value, true);
    } else {
      this.chosenProject = false;
    }
  }

  getSequence(parishId: number, increment: boolean) {
    this.studentService.getSequence(parishId)
      .subscribe(
        (data: any) => {
          this.sequence = data.sequence;
          if(increment){
           this.studentForm.get('studentCode').setValue(this.sequence + 1);
          }
        },
        err => console.error(err)
      );
  }


  upload() {
    let studentId: string = this.student.id.toString();
    this.studentService.uploadImage(this.filesToUpload, +studentId)
      .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.fileUploadStatus = true;
            console.log('File is completely uploaded!');
            this.router.navigate(['/home/student/list']);
          }
        }
      );
    this.filesToUpload = null;
  }
  cancel() {
    this.router.navigate(['/home/student/list']);
  }

  private handleSuccess(response) {
    console.log('Successfully uploaded image');
    //provide your own implementation of handling the response from API
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    this.error = error
    return Observable.throw(error.message || error);
  }
}
// Upload Image
// https://embed.plnkr.co/nO1C1lImOw8q7uQkrvRT/