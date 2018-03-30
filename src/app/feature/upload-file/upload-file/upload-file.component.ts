import { Component, OnInit } from '@angular/core';
import { Agency, Project } from '../../model';

import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/service/admin.service';
import { UploadService } from '../../shared/service/upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

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
    this.agencyService.get('/api/admin/agencies').subscribe(
      data => this.agencies = data,
      err => console.log(err)
    );
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
    this.uploadService.uploadFile(this.filesToUpload, this.agencyId, this.projectId, null)
      .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.fileUploadStatus = true;
            console.log('File is completely uploaded!');
            this.router.navigate(['/upload/list']);
          }
        }
      );
  }
}
