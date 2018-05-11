import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Initializer, Dashboard } from '../model/index';
import { DashboardService } from '../shared/service/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Initializer;
  dashboard: Dashboard;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  maxOutList:any;

  ngOnInit() {
    this.dashboard = new Dashboard()
    this.data = this.route.snapshot.data.initdata;
    this.dashboard.sponsorCount = this.data.sponsorCount;
    this.dashboard.studentCount = this.data.studentCount;
    this.dashboard.enrollmentCount = this.data.enrollmentCount;
    this.dashboard.maxOutOverviews0 = this.data.maxOutOverviews0;
    this.dashboard.maxOutOverviews1 = this.data.maxOutOverviews1;
    this.dashboard.maxOutOverviews2 = this.data.maxOutOverviews2;

    this.maxOutList = [ 
      { name : 'Total Past Due', data: this.dashboard.maxOutOverviews0},
      { name : 'Total Due this month', data: this.dashboard.maxOutOverviews1},
      { name : 'Total Due next month', data: this.dashboard.maxOutOverviews2}
   ];
  }
}
