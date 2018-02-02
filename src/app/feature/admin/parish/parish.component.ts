import { Component, OnInit } from '@angular/core';
import { Parish, Project, Center, ParishProject } from '../../model/index';
import { AdminService, InitService } from '../../index';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-parish',
  templateUrl: './parish.component.html',
  styleUrls: ['./parish.component.css']
})
export class ParishComponent implements OnInit, OnDestroy {

  parishes: Array<Parish>;
  centers: Array<Center>;
  chosenCenter: boolean;

  constructor(private adminService: AdminService<Parish>,
    private projectService: AdminService<Project>,
    private initService: InitService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initService.getCenterList()
      .then(data => this.centers = data)
      .catch(err => console.log(err))
    this.chosenCenter = false;   
  }
  
  
  ngOnDestroy() {
  }

  addParish() {
    this.router.navigate(['admin/parish/add']);
  }

  cancel() {
    
  }

  selectParish(value: any) {
    this.chosenCenter = true;
    this.adminService.getById('/api/admin/parishes', +value)
      .then(data => this.parishes = data)
      .catch(err => console.log(err));
    console.log('center ', value);
  }

  onSelect(parish: Parish) {
    this.router.navigate(['/admin/parish/modify',  parish.id]);
  }

}
