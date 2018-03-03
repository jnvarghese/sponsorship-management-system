import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService, InitService } from '../../../index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project, Center, Parish } from '../../../model/index';

@Component({
  selector: 'app-parish-detail',
  templateUrl: './parish-detail.component.html',
  styleUrls: ['./parish-detail.component.css']
})
export class ParishDetailComponent implements OnInit {

  pageHeader: string;
  parishId: number;
  isParishSaved: boolean;
  parishForm: FormGroup;
  addingParish = false;
  editingParish = false;
  selectedCenterId: any;
  selectedProjects: Array<number>;
  iniitalProjectList: Array<any>;
  centers: Array<Center>;

  constructor(private adminService: AdminService<Parish>,
    private projectService: AdminService<Project>,
    private initService: InitService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageHeader = 'Add new parish';
    this.selectedProjects = [];
    this.iniitalProjectList = this.route.snapshot.data.projects;
    console.log(' Resolve snapshot data ', this.iniitalProjectList);
    this.createForm();
    this.initService.getCenterList()
      .then(data => this.centers = data)
      .catch(err => console.log(err));
    // this.chosenCenter = false;
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.pageHeader = 'Modify parish';     
        const id = +params['id'];
        console.log('OnInit route param id ', id);
        this.populateForm(id);
      }
    });
  }

  createForm() {
    this.parishForm = this.fb.group({
      id: '',
      code: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      status: ['', Validators.required],
      centerId: ['', Validators.required],
      projectsList: this.buildProjects()
    });
  }

  populateForm(parishId: number) {
    this.adminService.find('/api/admin/parishes', parishId)
      .then(data => {
        this.editingParish = true;
        console.log(' edit - parish ', data);
        this.selectedCenterId = data.centerId;
        this.parishId = data.id;
        return this.parishForm.setValue({
          id: data.id || '',
          code: data.code || '',
          name: data.name || '',
          city: data.city || '',
          status: +data.status || '',
          centerId: +data.centerId || '',
          projectsList: [this.buildProjects()]
        });
      });
  }

  saveParish() {
    if (this.parishForm.valid) {
      const form = Object.assign({}, this.parishForm.value, {
        projects: this.parishForm.value.projectsList.map((s, i) => {
          return {
            ppId: this.iniitalProjectList[i].ppId,
            projectId: this.iniitalProjectList[i].projectId,
            selected: s === true ? 1 : 0
          };
        })
      });
      this.adminService
        .save('/api/admin/parishes', form, this.parishId)
        .then(res => {
          this.isParishSaved = true;
        })
        .catch(this.handleError);
    }
  }

  cancel() {
    this.router.navigate(['admin/parish/list']);
  }

  get projectsLists(): FormArray {
    return this.parishForm.get('projectsList') as FormArray;
  }

  buildProjects() {
    let arr = [];
    console.log(' buildform ', this.iniitalProjectList);
    if (this.iniitalProjectList) {
      arr = this.iniitalProjectList.map(s => {
        return this.fb.control(s.selected);
      });
    }
    return this.fb.array(arr);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
