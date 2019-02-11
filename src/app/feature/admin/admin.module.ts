import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ProjectComponent,
  ParishComponent,
  AgencyComponent,
  ParishDetailComponent,
  AgencyDetailComponent,
  ProjectDetailComponent
} from './index';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonResolve } from '../shared/resolver/common.resolve';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    AgencyComponent,
    ProjectComponent,
    ParishComponent,
    ParishDetailComponent,
    AgencyDetailComponent,
    ProjectDetailComponent,
    OrganizationComponent,
    OrganizationDetailComponent
  ],
  providers: [
    CommonResolve
  ]
})

export class AdminModule { }
