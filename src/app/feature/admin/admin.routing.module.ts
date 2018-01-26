import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AgencyComponent, 
  ProjectComponent, 
  ParishComponent, 
  ParishprojectassignComponent 
} from './index';
import { CommonModule } from '@angular/common';

const adminRoutes: Routes = [
  { path: 'admin/agency', component: AgencyComponent },
  { path: 'admin/project', component: ProjectComponent },
  { path: 'admin/parish', component: ParishComponent },
  { path: 'admin/parish/:id', component: ParishComponent },
  { path: 'admin/parishprojectassign', component: ParishprojectassignComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }