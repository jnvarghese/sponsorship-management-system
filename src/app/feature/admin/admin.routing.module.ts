import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AgencyComponent, 
  ProjectComponent, 
  ParishComponent, 
  ParishprojectassignComponent, 
  ParishDetailComponent,
  AgencyDetailComponent,
  ProjectDetailComponent
} from './index';
import { CommonModule } from '@angular/common';
import { Project } from '../model/index';
import { CommonResolve } from '../shared/resolver/common.resolve';

const adminRoutes: Routes = [
  { path: 'admin/agency/list', component: AgencyComponent },
  { path: 'admin/agency/modify/:id', component: AgencyDetailComponent },
  { path: 'admin/agency/add', component: AgencyDetailComponent },
  { path: 'admin/project/list', component: ProjectComponent },
  { path: 'admin/project/modify/:id', component: ProjectDetailComponent },
  { path: 'admin/project/add', component: ProjectDetailComponent },
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