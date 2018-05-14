import { Component, OnInit } from '@angular/core';
import { Center, Parish, Initiative } from '../../model';
import { InitService } from '../../shared/service/init.service';
import { AdminService } from '../../shared/service/admin.service';
import { UploadService } from '../shared/upload.service';
import { Router } from '@angular/router';
import { Upload } from '../../model/upload';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-sponsor',
  templateUrl: './upload-sponsor.component.html',
  styleUrls: ['./upload-sponsor.component.css'],
  providers: []
})
export class UploadSponsorComponent implements OnInit {

  files: Array<Upload>;
  uploadSponsorFile: boolean = false;
  uploadSponsorList: boolean;
  parishChosen: boolean;
  centerChosen: boolean;
  centerId: number;
  centers: Array<Center>;
  parishId: number;
  parishes: Array<Parish>;
  filesToUpload: File;
  fileUploadStatus: boolean;
  error: any;
  readyToUpload: boolean;
  initiatives: Array<Initiative>;
  initiativeId: string;

  constructor(
    private centerService: InitService,
    private parishService: AdminService<Parish>,
    private uploadService: UploadService,
    private router: Router) { }

  ngOnInit() {
    this.uploadSponsorList = true;
    this.list('sponsor');
    this.uploadService.listInitiative().subscribe
      (data => this.initiatives = data,
      err => console.error('Error of getting initiative.'));
  }

  onInitiativeSelect(value: any){
    this.initiativeId = value;
  }
  uploadDocument() {
    this.uploadSponsorList = false;
    this.uploadSponsorFile = true;
    this.centerService.getCenterList().subscribe(
      data => this.centers = data,
      err => console.log(err)
    );
  }

  cancel() {
    this.uploadSponsorList = true;
    this.uploadSponsorFile = false;
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

  onCenterSelect(value: any) {
    if (value !== "0") {
      this.centerChosen = true;
      this.centerId = +value;
      this.parishService.getById('/api/admin/parishes', +value)
        .subscribe(
          data => this.parishes = data,
          err => console.log(err)
        );
    }
  }

  onParishSelect(value: any) {
    if (value !== "0") {
      this.parishChosen = true;
      this.parishId = +value;
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
    this.uploadService.uploadFile(this.filesToUpload, 'sponsor', this.parishId, this.initiativeId)
      .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.fileUploadStatus = true;
            console.log('File is completely uploaded!');
            this.list('sponsor');
            this.uploadSponsorList = true;
            this.uploadSponsorFile = false;
          }
        }
      );
  }

}
