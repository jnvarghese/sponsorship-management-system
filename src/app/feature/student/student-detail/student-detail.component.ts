import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../shared/service/student.service';
import { Student, Project } from '../../model/index';
import { AdminService } from '../../shared/service/admin.service';

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
  projects: Array<Project>;
  
  isStudentSaved: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private commonService: AdminService<Project>,
    private fb: FormBuilder) {   
  }
  //https://angular.io/guide/reactive-forms
  ngOnInit() {
      this.commonService.get(`/api/admin//projects`)
        .then(data  =>{
          this.projects = data;
        })
        .catch(err =>{
          console.log(' Error ', err);
        });
      this.createForm();
      let studentId = this.route.snapshot.params['id'];
      if (studentId !== undefined) {
        const id = +studentId;
        this.navigated = true;
        this.populateForm(id);
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

  createForm() {
    this.studentForm = this.fb.group({
      id: '',
      firstName: [null, Validators.required],
      status: '',
      middleName: '',
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      address: '',
      gender: [null, Validators.required],
      projectId: [null, Validators.required],
      hobbies: '',
      talent: '',
      recentAchivements: '',
    });
  }
  populateForm(id: number){
    this.studentService.findStudent(id)
    .then(student => {
      console.log(' edit - student ',student);
      this.student = student
      this.selectedProjectId = this.student.projectId;            ;
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
    });
  }
  saveStudent(): void {
    if (this.studentForm.valid) {
      this.studentService
        .save(this.studentForm.value)
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
