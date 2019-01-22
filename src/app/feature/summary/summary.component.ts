import { Component, OnInit } from '@angular/core';
import { Parish } from '../model';
import { AdminService } from '../shared/service/admin.service';
import { EnrollService } from '../shared/service/enroll.service';
import { Summary } from '../model/summary';
import { s } from '@angular/core/src/render3';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {

    summeries: Array<Summary>;
    private message:string;
    private showSummary:boolean = false;
    parishes: Array<Parish>;
    selectedParish: number;
    totalNumberOfStudents:number;
    totalConstribution:number;
    totalSponsor:number;

    constructor(private enrollService: EnrollService, private adminService: AdminService<Parish>) { }
    

    ngOnInit(): void {
    this.adminService.get('/api/admin/parishes')
      .subscribe(
        data => this.parishes = data,
        err => console.log(err)
      );
      this.message = 'Please select a parish to see the summary.'
    }

    onParishSelect(parishId: number) {
        if (parishId != 0) {
          this.selectedParish = parishId;
          this.message = null;
          this.enrollService.getSummary(parishId).subscribe(
            data => {
              this.summeries = data
              this.totalNumberOfStudents = 
                this.summeries.map(s => s.students.length)
                      .reduce((numberOfKids, stCount) => {
                      return numberOfKids + stCount;
                }, 0);
              this.totalConstribution =  this.summeries.map(s => s.contribution)
                        .reduce((ctn, contribution) => {
                        return ctn + contribution;
                  }, 0);
              if(this.summeries.length < 1){
                this.showSummary = false;
                this.message = 'There is no summary for the selected parish.';
              }else{
                this.message = `Total number of Sponsor's: ${this.summeries.length}, Total number of students: ${this.totalNumberOfStudents}, Total Contribution: $${this.totalConstribution}`;
                this.showSummary = true;
              }
            },
            err => console.log(err));
        } else {
          this.message = 'Please select a parish to see the summary.'
          this.showSummary = false;
        }
      }
}