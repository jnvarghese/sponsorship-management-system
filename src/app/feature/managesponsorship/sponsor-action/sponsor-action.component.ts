import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorService } from '../../shared/service/sponsor.service';
import { SponsorshipInfo } from '../../model/index';

@Component({
  selector: 'app-sponsor-action',
  templateUrl: './sponsor-action.component.html',
  styleUrls: ['./sponsor-action.component.css']
})
export class SponsorActionComponent implements OnInit {

  info: SponsorshipInfo;

  constructor(private route: ActivatedRoute, private sponsorService: SponsorService) { }

  ngOnInit() {
    this.route.params.subscribe((params: { id: string }) => {
      this.sponsorService.getSponsorShipInfo(+params.id).subscribe((info) => {
        this.info = info[0];
      });
    });
  }

}
