import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Initializer, Dashboard, Graph, Receipt } from '../model/index';
import { DashboardService } from '../shared/service/dashboard.service';
import * as d3 from 'd3';
const d = require('./data.json');
const piedate = require('./piedata.json');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['']
})
export class DashboardComponent implements OnInit {

  data: Initializer;
  dashboard: Dashboard;
  effectiveDateGraph: Array<Graph>;
  expirationDateGraph: Array<Graph>;
  regionSponsors: Array<Graph>;
  centerSponsors: Array<Graph>;
  receipts: Array<Receipt>;
  sponsors: Array<Graph>;
  contributions: Array<Graph>;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  maxOutList: any;

  ngAfterContentInit() {
    d3.select('p').style('color', 'red');
  }
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
      { name: 'Total Past Due', data: this.dashboard.maxOutOverviews0 },
      { name: 'Total Due this month', data: this.dashboard.maxOutOverviews1 },
      { name: 'Total Due next month', data: this.dashboard.maxOutOverviews2 }
    ];

    this.getGraphDataByEffectiveDate();
    this.getGraphDataByExpirationDate();
    this.getSponsorsByDemography('region');
    this.getSponsorsByDemography('center');
    this.getReceipts();
    this.getSponsors();
    this.getContributionsAndSponsorCount();
  }

  getGraphDataByEffectiveDate() {
    this.dashboardService.getEnrollmentByEffectiveDateGraph().subscribe(
      data => this.effectiveDateGraph = data,
      error => console.error('Error in getting effective date enrollment graph')
    );
  }

  getGraphDataByExpirationDate() {
    this.dashboardService.getEnrollmentByExpirationDateGraph().subscribe(
      data => this.expirationDateGraph = data,
      error => console.error('Error in getting expiration date enrollment graph')
    );
  }

  getSponsorsByDemography(by: string) {
    this.dashboardService.getSponsorsByDemography(by).subscribe(
      data => {
        if ('region' === by) { this.regionSponsors = data }
        else this.centerSponsors = data
      },
      error => console.error('Error in getting expiration date enrollment graph')
    );
  }
  getSponsors(){
    this.dashboardService.getSponsors().subscribe(
      data => this.sponsors = data,
      error => console.error('Error in getting sponsor graph')
    );
  }
  getReceipts() {
    this.dashboardService.getReceipts().subscribe(
      data => {
        if (data) {
          this.receipts = data.reduce((initiatives, item) => {
            initiatives[item.initiativeId] = initiatives[item.initiativeId] || []
            initiatives[item.initiativeId].push({
              yaxis: item.total,
              xaxis: item.receiptDate
            })
            return initiatives
          }, []);
        }
      },
      error => console.error('Error in getting expiration date enrollment graph')
    );
  }

  getContributionsAndSponsorCount(){
    this.dashboardService.getContributionsAndSponsorCount().subscribe(
      data => this.contributions = data,
      error => console.error('Error in getting expiration date enrollment graph')
    );
  }
}
