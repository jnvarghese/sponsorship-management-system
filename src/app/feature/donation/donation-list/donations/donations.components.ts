
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Sponsor, SponsorReceipts, Receipts, StudentSummary, Project, Student } from '../../../model';
import { SponsorService } from '../../../shared/service/sponsor.service';
import { ReceiptsService } from '../../../shared/service/receipts.service';
import { StudentService } from '../../../shared/service/student.service';
import { AdminService } from '../../../shared/service/admin.service';


@Component({
  selector: 'donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  @Input() receipts;
  @Input() type;
  public sponsors: Array<Sponsor> = [];
  public sponsor: Sponsor;
  public sponsorReceipts: Array<SponsorReceipts> = [];
  enrollmentSummaries: Array<StudentSummary>;
  displaySponsorList: boolean = false;
  noSponsorMessage: string;
  error: string;
  searchedReceiptId: number;
  selectedStudentMap = {};
  studentsChecked = {};
  sponsorId: number;
  parishId: number;
  sponsorName: string;
  gender: string;
  projects: Array<Project>;
  students: Array<Student>;
  newStudents: Array<Student> = new Array<Student>();
  showStudentsList: boolean;
  sponsorSelected: boolean;
  addStudentToSponsorShip: boolean;

  @ViewChild('firstName') firstNameElement: ElementRef;
  @ViewChild('lastName') lastNameElement: ElementRef;
  @ViewChild('street') streetElement: ElementRef;
  @ViewChild('city') cityElement: ElementRef;
  @ViewChild('state') stateElement: ElementRef;
  @ViewChild('zipcode') zipcodeElement: ElementRef;

  sponsorReceiptAmount: number;
  refreshClicked:boolean;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  constructor(private studentService: StudentService,
    private receiptsService: ReceiptsService, 
    private sponsorService: SponsorService<Sponsor>,
    private adminService: AdminService<Project>) {
  }

  addStudentToSponsorship(student: Student, i: number){ 
    this.newStudents.push(student);
  }
  onParishSelect(receiptId: number){
    this.sponsorService.getSponorReceiptsByReceiptId(receiptId).subscribe(
      data => this.sponsors = data,
      err => this.handleError
    )
    this.displaySponsorList = true;
  }

  refresh(receipt: Receipts){
    this.refreshClicked = true;
    this.receiptsService.refresh(receipt.receiptId).subscribe(
      data => this.sponsorReceiptAmount = data.sponsorReceiptAmount,
      err => this.handleError
    )
  }

  addStudent(gender: string){
   this.addStudentToSponsorShip = true;
   this.gender = gender;
   this.adminService.getById('/api/admin/parishprojects', this.parishId)
    .subscribe(data => this.projects = data, err => console.log(err));
   console.log(` sponsor id ${this.sponsorId} , parish id ${this.parishId}`)
  }

  onProjectSelect(projectId: number){
    
    this.studentService.getByParishAndProjectAndGender(this.parishId, projectId, this.gender)
    .subscribe((data: Array<Student>) => {
      this.students = data
      this.showStudentsList = this.students.length > 0 ? true : false;
    }, err => console.log(err));

  }

  onSponsorSelect(sponsor: Sponsor){
    this.addStudentToSponsorShip = false;
    this.sponsorSelected = true;
    this.sponsorId = sponsor.id;
    this.parishId = sponsor.parishId;
    this.sponsorName = `${sponsor.firstName} ${sponsor.middleInitial} ${sponsor.lastName}` 

    this.selectedStudentMap = {};

    this.studentService.enrollmentBySponsorId(this.sponsorId).subscribe(
      data => this.enrollmentSummaries = data,
      err =>  console.log(`Error in component ... ${err}`)
    )
  }

  searchByNameAndParishId(parishId: number) {
    this.sponsorService.getSponsorsByFirstNameAndLastNameAndParishId(
      this.firstNameElement.nativeElement.value,
      this.lastNameElement.nativeElement.value, parishId).subscribe(
      data => {
        this.sponsors = data
        if (this.sponsors.length > 0) {
          this.displaySponsorList = true;
        } else {
          this.displaySponsorList = false;
          this.noSponsorMessage = 'No matching sponsors found.'
        }
      },
      err => {
        console.error('no sponsor found');
      },
      () => { console.log(' exiting from sponsor find ') }
    );
  }

  setCheckBoxVisible(studentId: number, month: number){
    const ele = document.getElementById(`checkBox${studentId}`) as HTMLInputElement;
    let event:any = { target : { checked: false}};
    
    if(month > 0){
      ele.checked = true;
      event.target.checked = true;
      //document.getElementById(`checkBox${studentId}`).checked = true;
      document.getElementById(`checkBox${studentId}`).removeAttribute("disabled")    
    //document.getElementById(`checkBox${studentId}`).setAttribute("disabled","false"); 
      this.updateCheckedOptions(studentId, event, month);
    } else {
      document.getElementById(`checkBox${studentId}`).setAttribute("disabled","false"); 
      //document.getElementById(`checkBox${studentId}`).checked = false;
      ele.checked = false;
      event.target.checked = false;
      this.updateCheckedOptions(studentId, event, month);
    } 
    
  }
  linkSponsor(receipt: Receipts){
    const eleIcon = document.getElementById(`linkIcon${receipt.receiptId}`) as HTMLInputElement;
    const eleSearchDiv = document.getElementById(`collapse-${receipt.receiptId}`) as HTMLInputElement;
    const students = this.getUniqueSelectedStudents();
    //console.log(` lenght ${JSON.stringify(students)}, receiptId ${receipt.receiptId}, sponsorId ${this.sponsorId}, amount ${receipt.amount}`)
    const sponsorReceipt = {
      sponsorId: this.sponsorId,
      receiptId: receipt.receiptId,
      amount: receipt.amount,
      type: '2',
      rdate: receipt.rdate,
      parishId: this.parishId,
      months:students 
    } as SponsorReceipts;

    this.receiptsService.saveSponsorReceipts(sponsorReceipt).subscribe(
      (data)=>{
        this.reset(receipt.receiptId);
        eleIcon.src = 'assets/images/check-mark.png';
        eleSearchDiv.style.display = 'none';
      },
      (err) => {console.error('Error')},
      () => {console.log('Finally')})
  }
  reset(receiptId: number) {
    const eleSearchDiv = document.getElementById(`collapse-${receiptId}`) as HTMLInputElement;
    this.newStudents = [];
    this.enrollmentSummaries = [];
    this.projects = [];
    this.sponsors = []
    this.sponsorSelected = false;
    this.addStudentToSponsorShip = false;
    eleSearchDiv.style.display = 'block';
    /*this.firstNameElement.nativeElement.value = '';
    this.lastNameElement.nativeElement.value = "";
    this.streetElement.nativeElement.value = "";
    this.cityElement.nativeElement.value = "";
    this.stateElement.nativeElement.value = "";
    this.zipcodeElement.nativeElement.value = "";*/
    // this.studentsChecked = [];
    //console.log(' --- ', JSON.stringify(this.selectedStudentMap));
    
    //console.log('---', this.getUniqueSelectedStudents());
    //this.selectedStudentMap.fo
   /* for(var x in this.optionsMap) {
      if(this.optionsMap[x]) {
          this.optionsChecked.push(x);
      }
  }*/
  }

  getUniqueSelectedStudents(){
    //{"2214":{"status":true,"month":"1"},"2246":{"status":true,"month":"2"}}
    Object.keys(this.selectedStudentMap).forEach((studentId, index) => {
      if (this.selectedStudentMap[studentId].status) {
        this.studentsChecked[studentId] = this.selectedStudentMap[studentId].month;
      } else {
        delete this.studentsChecked[studentId];
      }
    }); 
    const students =  []
    Object.keys(this.studentsChecked).forEach((studentId, index) => {
      students.push({ studentId : studentId, month: this.studentsChecked[studentId]});  
    })
    return students;
  }

  updateCheckedOptions(studentId, event, month) {
    this.selectedStudentMap[studentId] = {status: event.target.checked, month: month};
    console.log(JSON.stringify(this.selectedStudentMap));
  }
  searchByDemography(firstName: string, lastName: string, 
    street: string, city: string, state: string, zipcode: any, receiptId: number) {
    this.searchedReceiptId = receiptId;
    console.log(`${firstName} - ${lastName}`)
    if(!firstName || !lastName) {
       this.sponsors = []
       this.error = "At very minimal one letter from first name and last name are required."
       return true;
    }
    this.error = '';
    this.sponsorService.getSponsorsByDemography(
      firstName || '1',
      lastName || '1',
      street || '1',
      city || '1',
      state || '1',
      zipcode || 'Z',
      ).subscribe(
      data => {
        this.sponsors = data
        if (this.sponsors.length > 0) {
          this.displaySponsorList = true;
          this.noSponsorMessage = null;
        } else {
          this.displaySponsorList = false;
          this.noSponsorMessage = 'No matching sponsors found.'
        }
      },
      err => {
        console.error('no sponsor found');
      },
      () => { console.log(' exiting from sponsor find ') }
    );
  }
  /*
  findSponsorBySponsorCode(sponsorCode: string) {
    if (sponsorCode) {
      this.sponsorService.findSponsorBySponsorCode(sponsorCode).subscribe(
        data => { 
          this.sponsors = data;
          if (this.sponsors.length > 0) {
            this.displaySponsorList = true;
          } else {
            this.displaySponsorList = false;
          }
        },
        err => {
          console.error('no sponsor found');
        },
        () => { console.log(' exiting from sponsor find ') }
      );
    }
  } */

  findSponsorBySponsorCodeAndParishId(sponsorCode: string, parishId: number) {
    if (sponsorCode) {
      this.sponsorService.findSponsorParishIdAndSponsorCode(parishId, sponsorCode).subscribe(
        data => { 
          console.log(this.sponsors)
          console.log(data)
          this.sponsors.push(data)
          if (this.sponsors.length > 0) {
            this.displaySponsorList = true;
          } else {
            this.displaySponsorList = false;
          }
        },
        err => {
          console.error('no sponsor found');
        },
        () => { console.log(' exiting from sponsor find ') }
      );
    }
  }
  onParishSelectDepricated(parishId: number, receiptId: number): void {

    this.receiptsService.getSponsorReceiptsByReceiptId(receiptId).subscribe(
      data => {
        this.sponsorReceipts = data
      },
      err => { console.error('Error fetching sponsor receipts! ') }
    );
    /*if (this.sponsorReceipts) {
      this.sponsorService.getSponsorsByParishId(parishId).subscribe(
        data => {
          this.sponsors = data
          if (this.sponsors.length > 0) {
            this.displaySponsorList = true;
          } else {
            this.displaySponsorList = false;
          }
        },
        err => this.handleError
      );
    }*/


  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}