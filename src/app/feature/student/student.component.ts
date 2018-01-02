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

  public students: Array<Student>;

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit() {
   this.studentService.getStudents().then(data => {
      this.students = data;
    });
  }

  addStudent() {
    this.router.navigate(['./createStudent']);
  }

}
