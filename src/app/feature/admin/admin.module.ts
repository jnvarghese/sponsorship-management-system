import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { ProjectComponent, ParishComponent, AgencyComponent } from './index';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule 
  ],
  declarations: [
    AgencyComponent,
    ProjectComponent,
    ParishComponent
  ],
  providers: []
})

export class AdminModule { }
