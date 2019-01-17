
import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../shared/service/student.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'image-upload',
    template: `
      <div *ngIf="showloading">
         <img width="30px" src="assets/images/spinner.gif">  
      </div>
      <div *ngIf="!showloading">
        <div *ngIf="status == 'Y'">
          <img width="20px" src="assets/images/check-mark.png">
        </div>
        <div *ngIf="status == 'N'" style="display: inline-block">
           <input *ngIf="!fileSelected" type="file" accept="image/png" style="display: inline-block"
            (change)="handleFileInput($event)" 
            placeholder="Upload picture..." /> {{fileUploadStatus}}
            <!-- <p *ngIf="error">{{error}}</p> -->
            <div  [hidden]="!fileSelected" style="height: 30px">
            <p>
             <button  type="button" (click)="cancel()" class="btn btn-default btn-sm">Cancel</button>
             <button  type="button" (click)="upload()" class="btn btn-primary btn-sm">Upload {{fileName}}</button>
            </p>
             </div>
        </div>
      </div>
    `,
    styles: ['']
  })
  export class ImageUploadComponent implements OnInit {

    @Input()
    studentId: number;
    @Input()
    status: string;

    public student: Student;
    showloading:boolean = false;
    error: string;
    fileName: string;
    fileSelected:boolean = false;
    fileUploadStatus: boolean;
    filesToUpload: File;

    ngOnInit() {
       
    }
    
    constructor(
        private studentService: StudentService,
        private router: Router) {
      }

    cancel(){
      this.filesToUpload = null;
      this.fileSelected = false;  
    }

    handleFileInput(fileInput: any) {
        this.filesToUpload = fileInput.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
    
        if (this.filesToUpload && !this.filesToUpload.type.match(pattern)) {
          console.error('File is not an image');
          this.error = 'File is not an image';
          this.filesToUpload = null;
          this.fileSelected = false;        
          return;
        }else{
          this.error = null;
          this.fileName = this.filesToUpload.name;
          this.fileSelected = true;
        }
      }
    
      upload() {
        this.showloading = true;
      //  let studentId: string = this.studentId.toString();
        this.studentService.uploadImage(this.filesToUpload, +this.studentId)
          .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                this.fileUploadStatus = true;
                this.showloading = false;
                this.status = 'Y';
                console.log('File is completely uploaded!');
                this.router.navigate(['/home/student/list']);
              }
            },
            err => { 
              this.fileName ='';
              this.showloading = false;
              this.fileSelected = false;
              this.error = 'Upload Failed'
              console.error('Error is uploading image', err.message) }
          );
        this.filesToUpload = null;
      }
  }