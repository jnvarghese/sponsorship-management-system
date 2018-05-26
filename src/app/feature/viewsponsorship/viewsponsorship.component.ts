import { Component, OnInit } from '@angular/core';
import { EnrollService, AdminService } from '..';
import { saveAs as importedSaveAs } from "file-saver";
import { ViewEnroll, Parish } from '../model';

@Component({
  selector: 'app-viewsponsorship',
  templateUrl: './viewsponsorship.component.html',
  styleUrls: ['./viewsponsorship.component.css']
})
export class ViewSponsorshipComponent implements OnInit {

  viewEnrolls: Array<ViewEnroll>;
  parishes: Array<Parish>;
  selectedParish: number;
  selectedSortBy: number;
  displayEnrollments: boolean;
  error: any;
  message: any; 
  loading: boolean;

  constructor(private enrollService: EnrollService, private adminService: AdminService<Parish>) { }

  ngOnInit() {
    this.adminService.get('/api/admin/parishes')
      .subscribe(
        data => this.parishes = data,
        err => console.log(err)
      );
    this.message = 'Please select a parish to see the enrollments.'
  }

  onParishSelect(parishId: number) {
    if (parishId != 0) {
      this.selectedParish = parishId;
      this.message = null;
      this.enrollService.listEnrollments(parishId).subscribe(
        data => {
          this.viewEnrolls = data
          if(this.viewEnrolls.length < 1){
            this.displayEnrollments = false;
            this.message = 'There is no enrollment for the selected church.';
          }else{
            this.displayEnrollments = true;
          }
        },
        err => console.log(err));
    } else {
      this.message = 'Please select a parish to see the enrollments.'
      this.displayEnrollments = false;
    }
  }
  onCriteriaSelect(sortBy: number) {
    this.selectedSortBy = sortBy;
  }
  generateReport(fileName: string, enrollmentId: number) {
    this.enrollService.generateReport(enrollmentId).subscribe(
      blob => {
        this.loading = true
        importedSaveAs(blob, fileName.replace('.','') + ' - Light to Life - Sponsorship Information Document');
      },
      err => console.error(err),
      () => this.loading = false
    );
  }

  generateReceipt(fileName: string, enrollmentId: number) {
    this.enrollService.generateReceipt(enrollmentId).subscribe(
      blob => {
        importedSaveAs(blob, fileName.replace('.','') + ' - Light to Life - Receipt');
      }
    );
  }

  sortByCode() {
    this.viewEnrolls.sort((m1, m2) => {
      if (m1.uniqueId > m2.uniqueId) return 1;
      if (m1.uniqueId === m2.uniqueId) return 0;
      if (m1.uniqueId < m2.uniqueId) return -1;
    });
  }

  sortByName(){
    this.viewEnrolls.sort((m1, m2) => {
      if (m1.sponsorName > m2.sponsorName) return 1;
      if (m1.sponsorName === m2.sponsorName) return 0;
      if (m1.sponsorName < m2.sponsorName) return -1;
    });
  }
  
}
