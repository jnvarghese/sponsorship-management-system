import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../index';
import { Project, Agency } from '../../../model/index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  pageHeader: string;
  projectForm: FormGroup;
  isProjectSaved: boolean;
  error: any;
  navigated: boolean;
  selectedStatusId: number;
  projectId: number;
  agencies: Array<Agency>;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService<Project>,
    private agencyService: AdminService<Agency>) { }

  ngOnInit() {
    this.pageHeader = 'Add new project';
    this.createForm();
    this.agencyService.get('/api/admin/agencies')
      .subscribe(
        data => this.agencies = data, err => this.handleError);

    const projectId = this.route.snapshot.params['id'];
    if (projectId !== undefined) {
      this.pageHeader = 'Modify project';
      const id = +projectId;
      this.navigated = true;
      this.populateForm(id);
    } else {
      this.navigated = false;
    }
  }
  createForm() {
    this.projectForm = this.fb.group({
      id: '',
      code: [null, Validators.required],
      name: [null, Validators.required],
      address: '',
      contactNumber: '',
      emailAddress: '',
      status: 1,
      agencyId: ['', Validators.required]
    });
  }
  populateForm(id: number) {
    this.adminService.find('/api/admin/projects', id)
      .subscribe(
        project => {
          console.log(' Populate - project ', project);
          this.projectId = project.id;
          return this.projectForm.setValue({
            id: project.id,
            code: project.code,
            name: project.name,
            address: project.address || '',
            contactNumber: project.contactNumber || '',
            emailAddress: project.contactEmail || '',
            status: project.status,
            agencyId: project.agencyId
          });
        },
        err => this.handleError);
  }
  saveProject() {
    if (this.projectForm.valid) {
      this.adminService
        .save('/api/admin/projects', this.projectForm.value, this.projectId)
        .subscribe(
          res => {
            this.isProjectSaved = true;
          },
          err => this.handleError);
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  cancel() {
    this.router.navigate(['/admin/project/list']);
  }

}
