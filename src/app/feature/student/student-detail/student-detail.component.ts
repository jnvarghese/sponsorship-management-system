import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../shared/service/student.service';
import { Student, Project } from '../../model/index';
import { AdminService } from '../../shared/service/admin.service';
import { ValidatorService } from '../../../shared/validator.service';

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
  filesToUpload: File;
  selectedProjectId: any;
  selectedGender: any;
  projects: Array<Project>;
  isStudentSaved = false;
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
    this.commonService.get(`/api/admin//projects`)
      .subscribe(
        data => this.projects = data,
        error => error => this.handleError
      );
    this.createForm();
    const studentId = this.route.snapshot.params['id'];
    if (studentId !== undefined) {
      const id = +studentId;
      this.navigated = true;
      this.populateForm(id);
    } else {
      this.navigated = false;
      this.student = new Student();
    }
  }

  createForm() {
    this.studentForm = this.fb.group({
      id: '',
      firstName: [null, Validators.required],
      status: 0,
      middleName: '',
      lastName: [null, Validators.required],
      dateOfBirth: [null, [Validators.required, this.validatorService.validateDate]],
      address: '',
      gender: [null, Validators.required],
      projectId: [null, Validators.required],
      hobbies: '',
      talent: '',
      recentAchivements: '',
    });
  }
  populateForm(id: number) {
    this.studentService.findStudent(id)
      .subscribe(
        student => {
          console.log(' edit - student ', student);
          this.student = student;
          this.selectedProjectId = this.student.projectId;
          this.selectedGender = this.student.gender;
          return this.studentForm.setValue({
            id: this.student.id,
            firstName: this.student.firstName,
            middleName: this.student.middleName || '',
            lastName: this.student.lastName || '',
            dateOfBirth: this.student.dateOfBirth || '',
            address: this.student.address || '',
            status: this.student.status || '',
            gender: this.student.gender,
            projectId: this.student.projectId,
            hobbies: this.student.hobbies || '',
            talent: this.student.talent || '',
            recentAchivements: this.student.recentAchivements || '',
          });
        },
        error => error => this.handleError
      );
  }
  saveStudent(): void {
    if (this.studentForm.valid) {
      this.studentService
        .save(this.studentForm.value)
        .subscribe(
          response => {
            this.isStudentSaved = true;
            this.student = response
          },
          error => error => this.handleError
        );      
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
  upload() {
    let studentId: string = this.student.id.toString();
    this.studentService.uploadImage(this.filesToUpload, studentId)
      .subscribe(
        response => this.handleSuccess(response),
        error => this.handleError
      );
  }

  cancel() {
    this.router.navigate(['/student/list']);
  }

  private handleSuccess(response) {
    console.log('Successfully uploaded image');
    //provide your own implementation of handling the response from API
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.error = error
    return Promise.reject(error.message || error);
  }
}
// Upload Image
// https://embed.plnkr.co/nO1C1lImOw8q7uQkrvRT/