import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../shared/service/student.service';
import { Student } from '../../model/index';

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
  selectedProjectId:any;
  selectedGender:any;

  isStudentSaved: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder) {   
  }
  //https://angular.io/guide/reactive-forms
  ngOnInit() {
      this.createForm();
      let studentId = this.route.snapshot.params['id'];
      if (studentId !== undefined) {
        const id = +studentId;
        this.navigated = true;
        this.studentService.findStudent(id)
          .then(student => {
            this.student = student[0]
            this.selectedProjectId = this.student.project.id;
            this.selectedGender = this.student.gender;
            return this.studentForm.setValue({
              firstName: this.student.firstName,
              middleName: this.student.middleName ? this.student.middleName : '',
              lastName: this.student.lastName ? this.student.lastName : '',
              dateOfBirth: this.student.dateOfBirth ? this.student.dateOfBirth : '',
              address: this.student.address ? this.student.address : '', 
              gender: this.student.gender, 
              projectId: this.student.project.id,        
              hobby: this.student.hobbies ? this.student.hobbies : '',
              talent: this.student.talent ? this.student.talent : '',
              recentAchivements: this.student.recentAchivements ? this.student.recentAchivements : '',
            });
          });
      } else {
        this.navigated = false;       
        this.student = new Student();
      }

  }
  genders = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'O', label: 'Other'}
  ];

  projects = [{
    id: 1,
    label: 'Life to Life',
  },
  {
   id: 2,
   label: 'Life to Mission'
 }]

  createForm() {
    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      middleName: '',
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      address: [null, Validators.required],
      gender: [null, Validators.required],
      projectId: [null, Validators.required],
      hobby: '',
      talent: '',
      recentAchivements: '',
    });
  }
  saveStudent(): void {
    console.log(this.studentForm.status);
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      this.studentService
        .save(this.student)
        .then(response => {
        })
        .catch(error => this.error = error); // TODO: Display error message  
      this.isStudentSaved = true;
    }
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}
