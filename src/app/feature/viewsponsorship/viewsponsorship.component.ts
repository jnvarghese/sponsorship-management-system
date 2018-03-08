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

  constructor(private enrollService: EnrollService) { }

  ngOnInit() {
    this.enrollService.listEnrollments().subscribe(
      data => this.viewEnrolls = data,
      err => console.log(err) );
  }

  generateReport(fileName: string){
    this.enrollService.generateReport().subscribe(
      blob => {
        importedSaveAs(blob, fileName+' - Light to Life - Sponsorship Information Document');
      }
    );

  }

}
