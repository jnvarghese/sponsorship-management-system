import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../model/sponsor';
import { SponsorService } from '../shared/service/sponsor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {

  public sponsors: Array<Sponsor>;

  constructor(private router: Router, private sponsorService: SponsorService<Sponsor>) { }

  ngOnInit() {
   this.sponsorService.getSponsors().then(data => {
      this.sponsors = data;
    });
  }

  addSponser(): void {
    this.router.navigate(['./createsponsor']);
  }
}
