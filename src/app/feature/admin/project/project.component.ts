import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/index';
import { AdminService } from '../../index';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Array<Project>;
  
  constructor(private adminService: AdminService<Project>) { }

  ngOnInit() {
    this.adminService.get('/api/admin/projects')
      .then(data => this.projects = data)
      .catch(err => console.log(err));
  }

}
