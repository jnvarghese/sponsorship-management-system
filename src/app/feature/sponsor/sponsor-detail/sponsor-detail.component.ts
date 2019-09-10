import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sponsor, Parish, Center } from '../../model/index';
import { Component, Input, OnInit } from '@angular/core';
import { SponsorService } from '../../shared/service/sponsor.service';
import { AdminService } from '../../shared/service/admin.service';
import { InitService } from '../../shared/service/init.service';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.css']
})
export class SponsorDetailComponent implements OnInit {

  pageHeader: string;
  @Input() sponser: Sponsor;
  error: any;
  message: string;
  navigated = false; // true if navigated here
  isSponsorSaved: boolean = false;
  public sponsorForm: FormGroup;
  public address: FormGroup;
  parishes: Array<Parish>;
  centers: Array<Center>;
  chosenCenter: boolean;
  chosenParish: boolean;
  selectedParishId: number;
  sequence: number;
  isSponsorCodeEditable: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sponsorService: SponsorService<Sponsor>,
    private initService: InitService,
    private adminService: AdminService<Parish>,
    private fb: FormBuilder) { }

  // http://plnkr.co/edit/mWhYtc2nf8hSHFbLWlEx?p=preview

  ngOnInit() {
    this.pageHeader = 'Add new sponsor';
    this.createForm();
    const sponsorId = this.route.snapshot.params['id'];
    if (sponsorId !== undefined) {
      this.pageHeader = 'Modify sponsor'
      const id = +sponsorId;
      this.navigated = true;
      this.isSponsorCodeEditable = false
      this.sponsorService.findSponsor(id)
        .subscribe(
          res => {
            this.sponser = res;
            this.getSequence(this.sponser.parishId, false);
            this.pupulateForm(this.sponser);
          },
          err => this.handleError
        );
    } else {
      this.navigated = false;
      this.sponser = new Sponsor();
    }
    this.initService.getCenterList().subscribe(
      data => this.centers = data,
      err => console.log(err)
    );
    this.chosenCenter = false;
    /* this.adminService.get('/api/admin/parishes')
       .subscribe(
         data => this.parishes = data,
         err => this.handleError
       );*/
  }

  createForm() {
    this.sponsorForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      middleInitial: '',
      lastName: ['', Validators.required],
      phone1: '',
      nickName: '',
      sponsorCode: ['', Validators.required], //new FormControl({value: null, disabled: true}),
      dayOfBirth: 1,
      monthOfBirth: 1,
      emailAddress: ['', Validators.required],
      coSponserName: '',
      parishId: [null, Validators.required],
      sponsorStatus: 0,
      centerId: [null, Validators.required],
      street: ['', Validators.required],
      appartmentNumber: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ''//['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
    });
  }
  pupulateForm(sponser: Sponsor) {
    this.onCenterSelect(sponser.centerId);
    this.selectedParishId = sponser.parishId;
    this.sponsorForm.setValue({
      id: sponser.id,
      firstName: sponser.firstName,
      middleInitial: sponser.middleInitial || '',
      lastName: sponser.lastName,
      nickName: sponser.nickName,
      sponsorCode: sponser.sponsorCode,
      phone1: sponser.phone1,
      sponsorStatus: sponser.sponsorStatus,
      dayOfBirth: sponser.dayOfBirth || '',
      monthOfBirth: sponser.monthOfBirth || '',
      emailAddress: sponser.emailAddress,
      centerId: sponser.centerId,
      parishId: sponser.parishId,
      coSponserName: sponser.coSponserName || '',
      street: sponser.street,
      appartmentNumber: sponser.appartmentNumber || '',
      city: sponser.city,
      state: sponser.state,
      postalCode: sponser.postalCode || '',
    });
  }

  onCenterSelect(value: any) {
    if (value !== "0") {
      this.chosenCenter = true;
      this.adminService.getById('/api/admin/parishes', +value)
        .subscribe(
          data => this.parishes = data,
          err => console.log(err)
        );
    } else {
      this.chosenCenter = false;
    }
  }
  onParishSelect(value: any) {
    if (value !== "0") {
      this.chosenParish = true;
      this.getSequence(+value, true);
    } else {
      this.chosenParish = false;
    }
  }

  getSequence(parishId: number, increment: boolean) {
    this.sponsorService.getSequence(parishId)
      .subscribe(
        (data: any) => {
          this.sequence = data.sequence;
          if(increment){
             this.sponsorForm.get('sponsorCode').setValue(this.sequence + 1);
          }
        },
        err => console.error(err)
      );
  }

  saveSponsorDetails(sponsorFormvalue) {
    if (this.sponsorForm.valid) {
      //let sponsCode = +this.sponsorForm.get('sponsorCode').value;
     // if (this.navigated || sponsCode > this.sequence) {
        this.sponsorService
          .save(this.sponsorForm.value).subscribe(
            (res: Sponsor) => {
              this.isSponsorSaved = true;
              if (this.sponsorForm.get('id').value) {
                this.message = 'Sponsor has been modified.';
                this.error = null;
              } else {
                this.message = 'New Sponsor has been added.';
                this.error = null;
              }
              this.pupulateForm(res);
             // document.getElementById("message").focus();
            },
            (err)=> {
              console.log('oops', err.status);
              if(err.status == 400){
                this.error = 'Sponsor code already exists !!'
              }else{
                this.error = 'Unable to add sponsor data !!'
              }
            },
            () => console.log('Sposnor Save Call Done !')
          );
      /*} else {
        this.error = `Sponsor code should be greater than ${this.sequence}`;
        console.error('err');
      } */
    }
  }
  cancel() {
    this.router.navigate(['/home/sponsor/list']);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    debugger;
    return Promise.reject(error.message || error);
  }

}
