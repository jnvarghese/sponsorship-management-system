import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../model/organization';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../shared/service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  pageHeader: string;
  orgForm: FormGroup;
  isOrganizationSaved: boolean;
  error: any;
  navigated: boolean;
  organizationId: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService<Organization>) { }

  ngOnInit() {
    this.pageHeader = 'Add new organization';
    this.createForm();
    let orgznId = this.route.snapshot.params['id'];
    if (orgznId !== undefined) {
      this.pageHeader = 'Modify organization';
      const id = +orgznId;
      this.navigated = true;
      this.populateForm(id);
    } else {
      this.navigated = false;
    }
  }
  createForm() {
    this.orgForm = this.fb.group({
      id: '',
      code: [null, Validators.required],
      name: [null, Validators.required],
      status: 0,
    });
  }
  populateForm(id: number) {
    this.adminService.find('/api/admin/orgn', id)
      .subscribe(
        organization => {
          console.log(' Populate - agency ', organization);
          this.organizationId = organization.id;;
          return this.orgForm.setValue({
            id: organization.id,
            code: organization.code,
            name: organization.name || '',
            status: organization.status
          });
        }, err => this.handleError);
  }
  saveOrganization() {
    if (this.orgForm.valid) {
      this.adminService
        .save('/api/admin/orgns', this.orgForm.value, this.organizationId)
        .subscribe(
          (res: Organization) => {
            this.isOrganizationSaved = true;
            this.organizationId = res.id;
            this.orgForm.setValue({
              id: res.id,
              code: res.code,
              name: res.name || '',
              status: res.status
            });
          },
          err => this.handleError);
    }
  }
  private handleError(err): any {
    let errorMessage = err.json();
    if (errorMessage.exception.includes('DuplicateKeyException')) {
      this.error = 'Code exists, please try again.!';
      //  return Promise.reject('DuplicateKeyException')
      ;
    }
  }
  cancel() {
    this.router.navigate(['/home/admin/organization/list']);
  }

}
