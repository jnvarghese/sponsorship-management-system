import { Component, OnInit } from '@angular/core';
import { Organization } from '../../model/organization';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/service/admin.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent  implements OnInit {

  organizations: Array<Organization>;

  constructor(private adminService: AdminService<Organization>,
    private router: Router) { }

  ngOnInit() {
    this.adminService.get('/api/admin/orgns')
      .subscribe(
        data => this.organizations = data,
        err => console.log(err)
      );
  }

  addOrganization() {
    this.router.navigate(['/home/admin/organization/add']);
  }
}