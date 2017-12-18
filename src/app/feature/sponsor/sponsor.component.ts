import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../model/sponsor';
import { SponsorService } from '../shared/service/sponsor.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {

  public sponsors: Sponsor[];

  constructor(private sponsorService: SponsorService<Sponsor>) { }

  ngOnInit() {
   this.sponsorService.getSponsor().subscribe(data => {
      // Read the result field from the JSON response.
      this.sponsors = data;
    });
  }

}
