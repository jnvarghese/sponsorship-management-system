import { Component, OnInit } from '@angular/core';
import { sponsor } from '../model/sponsor';
import { sponsorService } from '../shared/service/sponsor.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class sponsorComponent implements OnInit {

  private sponsors: sponsor[];

  constructor(private sponsorService: sponsorService) { }

  ngOnInit() {
   this.sponsorService.getsponsor().subscribe(data => {
      // Read the result field from the JSON response.
      this.sponsors = data;
    });
  }

}
