import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorService } from '../../shared/service/sponsor.service';
import { Enrollment, Sponsor, SponsorshipInfo } from '../../model/index';
import * as moment from 'moment';

@Component({
  selector: 'app-sponsor-action',
  templateUrl: './sponsor-action.component.html',
  styleUrls: ['./sponsor-action.component.css']
})
export class SponsorActionComponent implements OnInit {

  infos: any;
  contributions: any;
  selectedStudentId: number;
  message: string;

  constructor(private route: ActivatedRoute, private sponsorService: SponsorService<Sponsor>) { }

  ngOnInit() {
    this.route.params.subscribe((params: { id: string }) => {
      if (params.id !== 'none') {
        this.selectedStudentId = +params.id;
        this.sponsorService.getSponsorShipInfo(this.selectedStudentId)
          .subscribe((info) => {
            if (info.length > 0) {
              this.message = null;
              this.infos = info;
            } else {
              this.infos = null;
              this.message = 'No Sponsorship records found!.';
            }
          });
      }
    });
  }

  showContributionDetail(sponsorId: number) {
    this.sponsorService.getContributionDetail(sponsorId, this.selectedStudentId)
      .subscribe(data => {
        if (data) {
          this.contributions = data;
          this.contributions.map(c => {
            let dateDiff = this.compare(moment(), moment(c.maxOutDate))
            if (dateDiff === -1) {
              c.expired = false;
            } else {
              c.expired = true;
            }
            return c;
          })
        }
      })
  }

  compare(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA, "DD/MM/YYYY");
    var momentB = moment(dateTimeB, "DD/MM/YYYY");


    if (momentA.isAfter(momentB)) return 1;
    else if (momentA.isBefore(momentB)) return -1;
    else return 0;
    /*
    now - 2020-02-25 17:10:47.0 - now is after given date then return 1
    now - 2025-09-30 20:00:47.0 now is before given date than return -1
    */
  }

}
