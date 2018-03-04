import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../index';
import { Agency } from '../../model/index';
import { Router } from '@angular/router';

@Component({
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  agencies: Array<Agency>;

  constructor(private adminService: AdminService<Agency>,
    private router: Router) { }

  ngOnInit() {
    this.adminService.get('/api/admin/agencies')
      .subscribe(
        data => this.agencies = data,
        err => console.log(err)
      );
  }

  addAgency() {
    this.router.navigate(['admin/agency/add']);
  }

}
