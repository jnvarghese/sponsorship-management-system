import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/service/student.service';
import { Student } from '../model/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public students: Student[];

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit() {
   this.studentService.getStudents().subscribe(data => {
      // Read the result field from the JSON response.
      this.students = data;
    });
  }

  createNewStudent() {
    this.router.navigate(['./createStudent']);
  }

}
