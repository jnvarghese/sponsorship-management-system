import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../index';
import { Agency } from '../../../model/index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.css']
})
export class AgencyDetailComponent implements OnInit {

  agencyForm: FormGroup;
  isAgencySaved: boolean;
  error: any;
  navigated: boolean;
  selectedStatusId: number;
  agecnyId: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService<Agency>)  { }

  ngOnInit() {
    this.createForm();
    let agencyId = this.route.snapshot.params['id'];
    if (agencyId !== undefined) {
      const id = +agencyId;
      this.navigated = true;
      this.populateForm(id);
    } else {
      this.navigated = false;       
    }
  }
  createForm() {
    this.agencyForm = this.fb.group({
      id: '',
      code: [null, Validators.required],
      name: [null, Validators.required],
      status: '',     
    });
  }
  populateForm(id: number){
    this.adminService.find('/api/admin/agencies', id)
    .then(agency => {
      console.log(' Populate - agency ',agency);
      this.agecnyId = agency.id;            ;
      return this.agencyForm.setValue({
        id: agency.id,
        code: agency.code,
        name: agency.name || '' ,
        status: agency.status     
      });
    });
  }
  saveAgency(){ 
    if (this.agencyForm.valid) {
      this.adminService
        .save('/api/admin/agencies',this.agencyForm.value, this.agecnyId)
        .then(res => {
          this.isAgencySaved = true;
        })
       .catch(this.handleError); 
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  cancel(){
    this.router.navigate(['/admin/agency/list']);
  }
}
