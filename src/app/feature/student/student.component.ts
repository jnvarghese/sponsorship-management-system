import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/service/student.service';
import { Student } from '../model/student';
import { Router } from '@angular/router';
import { Project, Graph, StudentActiveSummary, StudentSummary } from '../model';
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
  activeNonActiveStudents: Array<Graph>;
  activeActiveActiveInactiveStudents: Array<Graph>;

  activeInactiveSummary: any ;
  activeStudentsSummary:any;
  studentActiveSummary: StudentActiveSummary;
  activeActiveStudentSummaries: Array<StudentSummary>;
  activeInActiveStudentSummaries: Array<StudentSummary>;

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
      this.activeInactiveSummary = undefined;
      this.activeStudentsSummary = undefined;
      this.activeActiveStudentSummaries = undefined;
      this.activeInActiveStudentSummaries = undefined;
      
      this.chosenProject = true;
      this.selectedProjectId = value;
      this.studentService.getStudentsByProjectId(+value).subscribe(
        data => this.students = data,
        err => this.handleError
      );
    } else {
      this.chosenProject = false;
    }
  }

  onSummaryClick(){
   
    this.studentService.getStudentSummaryByProjectId(this.selectedProjectId).subscribe(
      data => {
        this.activeInactiveSummary = data['activeInactiveSummary'].map(item => {return {name : item.status, count: item.count}});
        this.activeStudentsSummary = data['activeStudentsSummary'].map(item => {return {name : item.status, count: item.count}});
        this.activeActiveStudentSummaries = data['activeActiveStudents'];
        this.activeInActiveStudentSummaries = data['activeInActiveStudents'];
        this.studentActiveSummary = data['summary'];
      },
      err => this.handleError
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
