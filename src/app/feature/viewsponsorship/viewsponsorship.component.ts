import { Component, OnInit } from '@angular/core';
import { EnrollService } from '..';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-viewsponsorship',
  templateUrl: './viewsponsorship.component.html',
  styleUrls: ['./viewsponsorship.component.css']
})
export class ViewSponsorshipComponent implements OnInit {

  viewEnrolls;
  selectedParish: number;
  selectedSortBy: number;

  constructor(private enrollService: EnrollService) { }

  ngOnInit() {
    this.enrollService.listEnrollments().subscribe(
      data => this.viewEnrolls = data,
      err => console.log(err) );
  }
  onParishSelect(parishId: number){
   this.selectedParish = parishId;
  
  }
  onCriteriaSelect(sortBy: number){
    this.selectedSortBy = sortBy;
  }
  generateReport(fileName: string, enrollmentId: number){
    this.enrollService.generateReport(enrollmentId).subscribe(
      blob => {
        importedSaveAs(blob, fileName+' - Light to Life - Sponsorship Information Document');
      }
    );

  }

}
