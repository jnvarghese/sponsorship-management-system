import { Component, OnInit } from '@angular/core';

import { MaxOutSponsor } from '../../model/maxoutsponsor';
import { SponsorService, StudentService, EnrollService } from '../../shared';
import { Sponsor, Student } from '../../model';

@Component({
  selector: 'app-expired-sponsorship',
  templateUrl: './expired-sponsorship.component.html',
  styleUrls: ['./expired-sponsorship.component.css']
})
export class ExpiredSponsorshipComponent implements OnInit {

  constructor(private sponsorService: SponsorService<Sponsor>, 
              private studentService: StudentService,
              private enrollService: EnrollService) { }

  maxOutSponsors: Array<MaxOutSponsor>;
  regionSponsorGroups: any;
  centerSponsorGroups: any;
  parishSponsorGroups: any;
  sponsorGroups: any;
  objectKeys = Object.keys;
  selectedRegionKey: any;
  selectedCenterKey: any;
  selectedParishKey: any;
  selectSponsorKey: any;

  students: Array<Student>

  ngOnInit() {
    this.getMaxOuts();
  }

  getMaxOuts(){
    this.sponsorService.getMaxOutSponsorship().subscribe(
      data => {
        this.regionSponsorGroups = data.reduce((acc, sponsor) => {
          acc[sponsor.regionName] = acc[sponsor.regionName] || []
          acc[sponsor.regionName].push(this.pushToArray(sponsor))
          return acc;
        }, {})
      },
      err => console.error('Error is getting max out sponsorships'),
      () => {

      }
    )
  }

  refresh(){
    this.regionSponsorGroups= [];
    this.centerSponsorGroups = [];
    this.parishSponsorGroups = [];
    this.sponsorGroups = [];
    this.getMaxOuts();
  }

  onRegionSelect(regionArray: any, regionKey: any) {
    this.selectedRegionKey = regionKey
    this.centerSponsorGroups = regionArray.reduce((acc, sponsor) => {
      acc[sponsor.centerName] = acc[sponsor.centerName] || []
      acc[sponsor.centerName].push(this.pushToArray(sponsor))
      return acc;
    }, {})
  }

  onCenterSelect(centerArray: any, centerKey: any) {
    console.log(' CEnter Key', centerKey);
    this.selectedCenterKey = centerKey
    this.parishSponsorGroups = centerArray.reduce((acc, sponsor) => {
      acc[sponsor.parishName] = acc[sponsor.parishName] || []
      acc[sponsor.parishName].push(this.pushToArray(sponsor))
      return acc;
    }, {})
  }

  onParishSelect(parishArray: any, parishKey: any) {
    this.selectedParishKey = parishKey
    this.sponsorGroups = parishArray.reduce((acc, sponsor) => {
      acc[sponsor.sponsorName] = acc[sponsor.sponsorName] || []
      acc[sponsor.sponsorName].push(this.pushToArray(sponsor))
      return acc;
    }, {})
  }

  onSponsorSelect(sponsorArray: any, sponsorKey: any) {
    this.selectSponsorKey = sponsorKey;
    const { enrollmentId } = sponsorArray[0];
    this.studentService.listByEnrollmentId(enrollmentId).subscribe(
      data => this.students = data,
      err => console.error('Error in getting students usig enrollmentid')
    )
  }

  deleteSponsorship(enrollmentId: number){
    this.enrollService.release(enrollmentId).subscribe(
      response => console.log(response),
      error => console.error(`Error in releasing the sponsorship ${JSON.stringify(error)}`),
      () => console.log('Executed Delete')
    )
  }

  pushToArray(group: any) {
    let sponsor = {};
    Object.keys(group).forEach(key => {
      sponsor[key] = group[key]
    });
    return sponsor;
  }
}
