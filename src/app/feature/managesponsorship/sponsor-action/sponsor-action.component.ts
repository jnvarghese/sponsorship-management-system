import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorService } from '../../shared/service/sponsor.service';
import { Enrollment, Sponsor, SponsorshipInfo } from '../../model/index';

@Component({
  selector: 'app-sponsor-action',
  templateUrl: './sponsor-action.component.html',
  styleUrls: ['./sponsor-action.component.css']
})
export class SponsorActionComponent implements OnInit {

  infos: any;
  contributions: any;
  selectedStudentId: number;

  constructor(private route: ActivatedRoute, private sponsorService: SponsorService<Sponsor>) { }

  ngOnInit() {
    this.route.params.subscribe((params: { id: string }) => {
      if (params.id !== 'none') {
        this.selectedStudentId = +params.id;
        this.sponsorService.getSponsorShipInfo(this.selectedStudentId)
          .subscribe((info) => {
            if (info) {
              this.infos = info;
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
        }
      })
  }

}
