import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from "../../..";
import { Agency } from "../../../model";

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.css']
})
export class AgencyDetailComponent implements OnInit {

  pageHeader: string;
  agencyForm: FormGroup;
  isAgencySaved: boolean;
  error: any;
  navigated: boolean;
  selectedStatusId: number;
  agecnyId: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService<Agency>) { }

  ngOnInit() {
    this.pageHeader = 'Add new agency';
    this.createForm();
    let agencyId = this.route.snapshot.params['id'];
    if (agencyId !== undefined) {
      this.pageHeader = 'Modify agency';
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
      status: 1,
    });
  }
  populateForm(id: number) {
    this.adminService.find('/api/admin/agencies', id)
      .subscribe(
        agency => {
          console.log(' Populate - agency ', agency);
          this.agecnyId = agency.id;;
          return this.agencyForm.setValue({
            id: agency.id,
            code: agency.code,
            name: agency.name || '',
            status: agency.status
          });
        }, err => this.handleError);
  }
  saveAgency() {
    if (this.agencyForm.valid) {
      this.adminService
        .save('/api/admin/agencies', this.agencyForm.value, this.agecnyId)
        .subscribe(
          res => {
            this.isAgencySaved = true;
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
    this.router.navigate(['/home/admin/agency/list']);
  }
}
