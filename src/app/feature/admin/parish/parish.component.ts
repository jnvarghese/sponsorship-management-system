import { Component, OnInit } from '@angular/core';
import { Parish, Project, Center } from '../../model/index';
import { AdminService, InitService } from '../../index';

@Component({
  selector: 'app-parish',
  templateUrl: './parish.component.html',
  styleUrls: ['./parish.component.css']
})
export class ParishComponent implements OnInit {

  parishes: Array<Parish>;
  centers: Array<Center>;

  constructor(private adminService: AdminService<Parish>,
    private initService: InitService) { }

  ngOnInit() {
   /* this.adminService.get('/api/admin/parishes')
      .then(data => this.parishes = data)
      .catch(err => console.log(err));*/

    this.initService.getCenterList()
      .then(data => this.centers = data)
      .catch(err => console.log(err))
  }

  selectParish(value: any){
    this.adminService.getById('/api/admin/parishes',+value)
      .then(data => this.parishes = data)
      .catch(err => console.log(err));
    console.log( 'center ', value);
  }

}
