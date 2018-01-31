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

  isParishSaved: boolean;
  parishForm: FormGroup;
  addingParish = false;
  editingParish = false;
  selectedCenterId: any;
  selectedProjects: Array<number>;
  projects: Array<Project>;
  centers: Array<Center>;

  constructor(private adminService: AdminService<Parish>,
    private projectService: AdminService<Project>,
    private initService: InitService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.selectedProjects = [];
    this.projects = this.route.snapshot.data.projects;
    console.log( ' Resolve snapshot data ', this.projects);
    this.createForm();
    this.initService.getCenterList()
      .then(data => this.centers = data)
      .catch(err => console.log(err))
    // this.chosenCenter = false;
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {  
        const id = +params['id'];
        console.log( 'OnInit route param id ',id);
        
        this.populateForm(id);
      }
    });   
     
  }

  createForm() {    
    this.parishForm = this.fb.group({
      id: '',
      code: ['', Validators.required],
      name: '',
      city: '',
      status: '',
      centerId: '',
      projectsList: this.buildProjects()
    });    
  }

  saveParish() {
    console.log( ' form ' , this.parishForm.value)
  }

  cancel() {
    this.router.navigate(['admin/parish/list']);
  }

  get projectsLists(): FormArray {
    return this.parishForm.get('projectsList') as FormArray;
  };

  buildProjects() {
    let arr = [];
    console.log( ' buildform ', this.projects);
    if (this.projects) {
      arr = this.projects.map(s => {
        return this.fb.control(s.selected);
      })
    }
    return this.fb.array(arr);
  }
  populateForm(parishId: number) {
    this.adminService.find('/api/admin/parishes', parishId)
      .then(data => {
        this.editingParish = true;
        console.log(' edit - parish ', data);
        this.selectedCenterId = data.centerId;
       /* data.parishProjects.forEach(e => {
          this.selectedProjects.push(e.parishId);
        })*/
        return this.parishForm.setValue({
          id: data.id || '',
          code: data.code || '',
          name: data.name || '',
          city: data.city || '',
          status: data.status || '',
          centerId: data.centerId || '',
          projectsList: this.buildProjects()
        });
      });
  }
}
