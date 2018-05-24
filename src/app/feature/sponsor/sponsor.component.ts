import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../model/sponsor';
import { SponsorService } from '../shared/service/sponsor.service';
import { Router } from '@angular/router';
import { Parish } from '../model';
import { AdminService } from '../shared/service/admin.service';


@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {

  public sponsors: Array<Sponsor>;
  parishes: Array<Parish>;
  selectedParish: number;
  displaySponsorList: boolean = false;
  error: any;
  message: any;

  constructor(private router: Router, 
              private sponsorService: SponsorService<Sponsor>,
              private adminService: AdminService<Parish>) { }

  ngOnInit() {
    this.adminService.get('/api/admin/parishes')
      .subscribe(
        data => this.parishes = data,
        err => console.log(err)
      );
    this.message = 'Please select a parish to see the sponsors.'
  }

  onParishSelect(parishId: number) {
    if (parishId != 0) {
      this.selectedParish = parishId;
      this.message = null;
      this.sponsorService.getSponsorsByParishId(parishId).subscribe(
        data => {
          this.sponsors = data
          if(this.sponsors.length>1){
            this.displaySponsorList = true;
          }else{
            this.displaySponsorList = false;
          }
        },
        err => this.handleError
       );
    } else {
      this.message = 'Please select a parish to see the sponsors.'
    }
  }

  addSponser(): void {
    this.router.navigate(['/home/sponsor/add']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
