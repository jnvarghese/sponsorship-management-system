import { Component, OnInit } from '@angular/core';
import { Agency, Project } from '../../model';
import { AdminService } from '../../shared/service/admin.service';
import { UploadService } from '../shared/upload.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Upload } from '../../model/upload';

@Component({
  selector: 'app-upload-student',
  templateUrl: './upload-student.component.html',
  styleUrls: ['./upload-student.component.css']
})
export class UploadStudentComponent implements OnInit {

  files: Array<Upload>;
  uploadStudentFile: boolean = false;
  uploadStudentList: boolean;
  agencies: Array<Agency>;
  agencyChosen: boolean;
  projectChosen: boolean;
  readyToUpload: boolean;
  fileUploadStatus: boolean;
  projects: Array<Project>;
  agencyId: number;
  projectId: number;
  filesToUpload: File;
  error: any;

  constructor(
    private agencyService: AdminService<Agency>,
    private projectService: AdminService<Project>,
    private uploadService: UploadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.uploadStudentList = true;
    this.list('student');   
  }

  uploadDocument(){
    this.uploadStudentList = false;
    this.uploadStudentFile = true;
    this.agencyService.get('/api/admin/agencies').subscribe(
      data => this.agencies = data,
      err => console.log(err)
    );
  }

  cancel(){
    this.uploadStudentList = true;
    this.uploadStudentFile = false;
  }

  list(type: string) {
    this.uploadService.list(type)
      .subscribe(data => {
        this.files = data;
      },
        err => {
          console.log('Error in listing the files', err)
        });
  }

  onAgencySelect(value: any) {
    if (value !== "0") {
      this.agencyChosen = true;
      this.agencyId = +value;
      this.projectService.getById('/api/admin/projects', +value)
        .subscribe(
          data => this.projects = data,
          err => console.log(err)
        );
    }
  }

  onProjectSelect(value: any) {
    if (value !== "0") {
      this.projectChosen = true;
      this.projectId = +value;
    }
  }
  handleFileInput(fileInput: any) {
    this.filesToUpload = fileInput.target.files[0];

    let pattern = /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/;

    if (!this.filesToUpload.type.match(pattern)) {
      console.error('File is not supported');
      this.error = 'Unsupported file upload noticed,';
      this.filesToUpload = null;
      return;
    } else {
      this.readyToUpload = true;
    }

  }
  upload() {
    this.uploadService.uploadFile(this.filesToUpload, 'student', this.projectId)
      .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.fileUploadStatus = true;
            console.log('File is completely uploaded!');
            this.router.navigate(['/home/upload/uploadstudent']);
          }
        }
      );
  }

}
