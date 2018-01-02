import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../shared/service/student.service';
import { Student } from '../../model/index';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() student: Student;
  //@Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  isStudentSaved: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService) { }

  /* addStudentForm: FormGroup;
   firstName = new FormControl('', Validators.required);
   lastName = new FormControl('', Validators.required);
   dateOfBirth = new FormControl('', Validators.required);
   address = new FormControl('', Validators.required);*/
  // gender = new FormControl(Validators.required);

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.studentService.getStudent(id)
          .then(student => this.student = student[0] );
      } else {
        this.navigated = false;
        this.student = new Student();
      }
      // In a real app: dispatch action to load the details here.
    });

    /* this.addStudentForm = new FormGroup({
       firstName: this.firstName,
       lastName: this.lastName,
       dateOfBirth: this.dateOfBirth,
       address: this.address,
       // gender: this.gender
     });*/
  }

  saveStudent():void {
    //  if (this.addStudentForm.valid) {
    this.studentService
      .save(this.student)
      .then(response => {
        console.log(response);
      })
      .catch(error => this.error = error); // TODO: Display error message  
    this.isStudentSaved = true;
  }

 cancel() {
    this.router.navigate(['/students']);
  }
}
