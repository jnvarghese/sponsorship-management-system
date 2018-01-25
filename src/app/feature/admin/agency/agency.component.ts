import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../index';
import { Agency } from '../../model/index';

@Component({
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  agencies: Array<Agency>;
  
  constructor(private adminService: AdminService<Agency>) { }

  ngOnInit() {
    this.adminService.get('/api/admin/agencies')
      .then(data => this.agencies = data)
      .catch(err => console.log(err));
  }

}
