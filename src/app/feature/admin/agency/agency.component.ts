import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../index';
import { Agency } from '../../model/index';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private adminService: AdminService<Agency>) { }

  ngOnInit() {
 
  }

}
