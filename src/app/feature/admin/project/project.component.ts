import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/index';
import { AdminService } from '../../index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Array<Project>;

  constructor(private adminService: AdminService<Project>,
    private router: Router) { }

  ngOnInit() {
    this.adminService.get('/api/admin/projects')
      .subscribe(
        data => this.projects = data, err => console.log(err)
      );
  }

  addProject() {
    this.router.navigate(['/home/admin/project/add']);
  }
}
