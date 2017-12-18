import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../shared/service/student.service';
import { Student } from '../../model/index';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  isStudentSaved: boolean;
  error: any;
  constructor(private router: Router, private studentService: StudentService) { }

  addStudentForm: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  dateOfBirth = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  // gender = new FormControl(Validators.required);

  ngOnInit() {
    this.addStudentForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      address: this.address,
      // gender: this.gender
    });
  }

  saveStudentDetails(studentFormvalue) {
    if (this.addStudentForm.valid) {
     /*this.studentService
      .save(studentFormvalue)
      .then(hero => {
      })
      .catch(error => this.error = error); // TODO: Display error message
  */
      this.isStudentSaved = true;
    }

  }

  cancel() {
    this.router.navigate(['/students']);
  }
}
