import { Component, OnInit } from "@angular/core";
import { Parish, Center, Project } from "../../model";
import { AdminService, InitService } from "../..";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-parish',
  templateUrl: './parish.component.html',
  styleUrls: ['./parish.component.css']
})
export class ParishComponent implements OnInit {

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
    this.initService.getCenterList().subscribe(
      data => this.centers = data,
      err => console.log(err)
    );
    this.chosenCenter = false;
  }

  addParish() {
    this.router.navigate(['admin/parish/add']);
  }

  cancel() {}

  selectParish(value: any) {
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

  onSelect(parish: Parish) {
    this.router.navigate(['/admin/parish/modify', parish.id]);
  }

}
