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
    this.studentService.getStudents().subscribe(
      data => this.students = data,
      err => this.handleError
    );
  }

  addStudent() {
    this.router.navigate(['/student/add']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
