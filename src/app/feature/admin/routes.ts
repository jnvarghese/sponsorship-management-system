import {
  AgencyComponent,
  ProjectComponent,
  ParishComponent,
  ParishDetailComponent,
  AgencyDetailComponent,
  ProjectDetailComponent
} from './index';
import { CommonResolve } from '../shared/resolver/common.resolve';
import { Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';

export const adminRoutes: Routes = [
  { path: 'admin/agency/list', component: AgencyComponent },
  { path: 'admin/agency/modify/:id', component: AgencyDetailComponent },
  { path: 'admin/agency/add', component: AgencyDetailComponent },
  { path: 'admin/project/list', component: ProjectComponent },
  { path: 'admin/project/modify/:id', component: ProjectDetailComponent },
  { path: 'admin/project/add', component: ProjectDetailComponent },
  { path: 'admin/parish/list', component: ParishComponent},
  { path: 'admin/parish/modify/:id', component: ParishDetailComponent , resolve: { projects:  CommonResolve } },
  { path: 'admin/parish/add', component: ParishDetailComponent , resolve: { projects:  CommonResolve } },
  { path: 'admin/organization/list', component: OrganizationComponent},
  { path: 'admin/organization/modify/:id', component: OrganizationDetailComponent },
  { path: 'admin/organization/add', component: OrganizationDetailComponent },
];
