import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private router: Router) { }
  addStudentForm: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  dateOfBirth = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  //gender = new FormControl(Validators.required);
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
    console.log(' save called');
    this.router.navigate(['/students']);
  }
  cancel() {
    this.router.navigate(['/students']);
  }
}
