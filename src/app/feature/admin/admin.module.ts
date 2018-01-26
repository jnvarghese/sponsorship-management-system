import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { 
  ProjectComponent, 
  ParishComponent, 
  AgencyComponent, 
  ParishprojectassignComponent 
} from './index';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule 
  ],
  declarations: [
    AgencyComponent,
    ProjectComponent,
    ParishComponent,
    ParishprojectassignComponent
  ],
  providers: []
})

export class AdminModule { }
