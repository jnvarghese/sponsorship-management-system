import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorService } from '../../shared/service/sponsor.service';
import { Enrollment, Sponsor } from '../../model/index';

@Component({
  selector: 'app-sponsor-action',
  templateUrl: './sponsor-action.component.html',
  styleUrls: ['./sponsor-action.component.css']
})
export class SponsorActionComponent implements OnInit {

  info: Enrollment;

  constructor(private route: ActivatedRoute, private sponsorService: SponsorService<Sponsor>) { }

  ngOnInit() {
    this.route.params.subscribe((params: { id: string }) => {
      if (params.id !== 'none') {
        this.sponsorService.getSponsorShipInfo(+params.id).subscribe((info) => {
          this.info = info[0];
        });
      }
    });
  }

}
