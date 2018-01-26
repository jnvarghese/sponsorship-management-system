import { Component, OnInit } from '@angular/core';
import { Parish, Project, Center } from '../../model/index';
import { AdminService, InitService } from '../../index';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  parishForm: FormGroup;
  addingParish = false;
  editingParish = false;
  selectedParish: Parish;
  parishes: Array<Parish>;
  centers: Array<Center>;
  chosenCenter: boolean;
  queryParam: any;
  navigated = false; // true if navigated here
  selectedCenterId: any;

  constructor(private adminService: AdminService<Parish>,
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
    this.createForm();
    let parishId = this.route.snapshot.params['id'];
    if (parishId !== undefined) {
      this.populateForm(parishId);
    } else {
      this.addingParish = true
    }
  }

  ngOnDestroy() {
  }

  createForm() {
    this.parishForm = this.fb.group({
      id: '',
      code: [null, Validators.required],
      name: '',
      city: '',
      status: '',
      centerId: ''
    });
  }

  populateForm(parishId: number) {
    const id = +parishId;
    this.navigated = true;
    this.adminService.find('/api/admin/parishes', id)
      .then(data => {
        this.editingParish = true;
        console.log(' edit - parish ', data);
        this.selectedCenterId = data.centerId;
        return this.parishForm.setValue({
          id: data.id,
          code: data.code,
          name: data.name,
          city: data.city,
          status: data.status,
          centerId: data.centerId
        });
      });
  }

  saveParish() {
  }

  addParish() {
    this.editingParish = true;   
  }

  cancel() {
    this.editingParish = false;
  }

  selectParish(value: any) {
    this.chosenCenter = true;
    this.adminService.getById('/api/admin/parishes', +value)
      .then(data => this.parishes = data)
      .catch(err => console.log(err));
    console.log('center ', value);
  }

  onSelect(parish: Parish) {
    this.router.navigate(['/admin/parish', parish.id]);
  }

}
