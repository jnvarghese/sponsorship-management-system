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

  constructor(private route: ActivatedRoute,private dashboardService: DashboardService) { }

  ngOnInit() {
    console.log(' this.route.snapshot.data ', this.route.snapshot.data);
    this.data = this.route.snapshot.data.initdata;
    this.dashboardService.getDashboardInfo().then(data =>{
      console.log(data);
      this.dashboard.sponsorCount = data.sponsorCount
      this.dashboard.studentCount = data.studentCount
    });    
  }


  getDashboardInfo

}
