import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AgencyComponent, 
  ProjectComponent, 
  ParishComponent, 
  ParishprojectassignComponent, 
  ParishDetailComponent
} from './index';
import { CommonModule } from '@angular/common';
import { Project } from '../model/index';
import { CommonResolve } from '../shared/resolver/common.resolve';

const adminRoutes: Routes = [
  { path: 'admin/agency', component: AgencyComponent },
  { path: 'admin/project', component: ProjectComponent },
  { path: 'admin/parish/list', component: ParishComponent},   
  { path: 'admin/parish/modify/:id', component: ParishDetailComponent , resolve: { projects:  CommonResolve } }, 
  { path: 'admin/parish/add', component: ParishDetailComponent , resolve: { projects:  CommonResolve } }, 
  { path: 'admin/parishprojectassign', component: ParishprojectassignComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  providers : [
    CommonResolve
  ]
})
export class AdminRoutingModule { }