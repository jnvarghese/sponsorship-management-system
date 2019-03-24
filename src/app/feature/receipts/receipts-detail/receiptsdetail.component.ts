import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parish, Center, Initiative, Receipts } from '../../model';
import { AdminService } from '../../shared/service/admin.service';
import { InitService } from '../../shared/service/init.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptsService } from '../../shared/service/receipts.service';
import { ValidatorService } from '../../../shared/validator.service';
import { Organization } from '../../model/organization';

@Component({
  selector: 'app-receiptsdetail',
  templateUrl: './receiptsdetail.component.html',
  styleUrls: ['./receiptsdetail.component.css']
})
export class ReceiptsdetailComponent implements OnInit {

  public receiptsForm: FormGroup;
  isReceiptSaved: boolean;
  navigated: boolean;
  pageHeader: string;
  receipt: Receipts;
  organizations: Array<Organization>;
  parishes: Array<Parish>;
  centers: Array<Center>;
  chosenCenter: boolean;
  chosenParish: boolean;
  selectedCenterId: number;
  selectedParishId: number;
  selecteOrgId: number;
  initiatives: Array<Initiative>;
  selectedInitiativeId: number;
  message: string;
  isOrganizationSelected: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private receiptsService: ReceiptsService,
    private adminService: AdminService<Initiative>,
    private parishService: AdminService<Parish>,
    private organizationService: AdminService<Organization>,
    private initService: InitService,
    private validatorService: ValidatorService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.pageHeader = 'Add new receipt';
    this.createForm();
    const selectedParishId = this.route.snapshot.params['parishId'];
    const receiptId = this.route.snapshot.params['id'];
    if (receiptId !== undefined) {
      this.pageHeader = 'Modify receipt'
      const id = +receiptId;
      this.navigated = true;
      this.receiptsService.findReceipt(id)
        .subscribe(
          res => {
            this.receipt = res;
            this.pupulateForm(this.receipt);
          },
          err => this.handleError
        );
    } else {
      this.navigated = false;
      this.receipt = new Receipts();
    }
    this.adminService.get('/api/init/initiative').subscribe(
      data => this.initiatives = data,
      err => this.handleError
    );
    this.initService.getCenterList().subscribe(
      data => this.centers = data,
      err => this.handleError
    );
  }

  onCenterSelect(value: any) {
    if (value !== "0") {
      this.chosenCenter = true;
      this.parishService.getById('/api/admin/parishes', +value)
        .subscribe(
          data => this.parishes = data,
          err => this.handleError
        );
    } else {
      this.chosenCenter = false;
    }
  }

  onSourceSelect(value: any){
    const centerControl = this.receiptsForm.get('centerId');
    const parishControl = this.receiptsForm.get('parishId');
    const organizationControl = this.receiptsForm.get('organizationId');
    if (value == 1) {
      centerControl.setValidators(null);
      parishControl.setValidators(null);
      organizationControl.setValidators([Validators.required]);
      this.isOrganizationSelected = true
      this.organizationService.get('/api/admin/orgns')
        .subscribe(
          data => this.organizations = data,
          err => this.handleError
        );
    } else {
      centerControl.setValidators([Validators.required]);
      parishControl.setValidators([Validators.required]);
      organizationControl.setValidators(null);
      this.isOrganizationSelected = false;
    }
    centerControl.updateValueAndValidity();
    parishControl.updateValueAndValidity();
    organizationControl.updateValueAndValidity();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createForm() {
    this.receiptsForm = this.fb.group({
      receiptId: [''],
      referenceId: [''],
      rdate: [null, [Validators.required, this.validatorService.validateDate]],
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      fullName: '',
      transaction: '',
      amount: ['', Validators.required],
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      centerId:  [null, Validators.required],
      parishId:  [null, Validators.required],
      email1: '',
      email2: '',
      phone1: '',
      phone2: '',
      type: 0,
      status: 0,
      item: 0,
      receiptType: 0,
      initiativeId: [null, Validators.required],
      organizationId: 0
    });
  }
  pupulateForm(receipt: Receipts) {
    this.selectedCenterId = receipt.centerId;
    this.onCenterSelect(this.selectedCenterId);
    this.selectedParishId = receipt.parishId;
    this.selectedInitiativeId = receipt.initiativeId;
    this.receiptsForm.setValue({
      receiptId: receipt.receiptId,
      rdate: receipt.rdate,
      firstName: receipt.firstName,
      middleName: receipt.middleName || '',
      lastName: receipt.lastName,
      fullName: receipt.fullName,
      transaction: receipt.transaction,
      amount: receipt.amount,
      initiativeId: receipt.initiativeId || '',
      streetAddress: receipt.streetAddress || '',
      city: receipt.city,
      state: receipt.state,
      zipCode: receipt.zipCode,
      parishId: receipt.parishId,
      email1: receipt.email1 || '',
      email2: receipt.email2,
      phone1: receipt.phone1 || '',
      phone2: receipt.phone2,
      type: receipt.type,
      status: receipt.status || 0,
    });
  }

  saveReceipts() {
    /*Parish : 0, Organization : 1, Individual : 2*/
    let referenceId;
    if(this.receiptsForm.get('receiptType').value == 1){
      referenceId = this.receiptsForm.get('organizationId').value
    } else {
      referenceId = this.receiptsForm.get('parishId').value
    }
    this.receiptsForm.patchValue({
      referenceId:  referenceId
    });
    this.receiptsService.save(this.receiptsForm.value).subscribe(
      (data: Receipts) => { 
        this.isReceiptSaved = true;
        this.message = `Receipts saved successfully.`
        this.receiptsForm.patchValue({
          amount:  ''
        });
      },
      err => this.handleError
    )
  }

  cancel() {
    if(this.selectedParishId){
      this.router.navigate(['/home/receipts/list', this.selectedParishId]);
    }else{
      this.router.navigate(['/home/receipts/list']);
    }
  }
}
