import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/service/student.service';
import { Student } from '../model/student';
import { Router } from '@angular/router';
import { Project } from '../model';
import { AdminService } from './../shared/service/admin.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public students: Array<Student>;
  public projects: Array<Project>;
  public selectedProjectId: number;
  public chosenProject: boolean;

  constructor(private router: Router,
    private commonService: AdminService<Project>,
    private studentService: StudentService) { }

  ngOnInit() {
    this.commonService.get(`/api/admin//projects`)
      .subscribe(
        data => this.projects = data,
        error => error => this.handleError
      );
  }

  addStudent() {
    this.router.navigate(['/home/student/add']);
  }

  onProjectSelect(value: any) {
    if (value !== "0") {
      this.chosenProject = true;
      this.studentService.getStudentsByProjectId(+value).subscribe(
        data => this.students = data,
        err => this.handleError
      );
    } else {
      this.chosenProject = false;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
