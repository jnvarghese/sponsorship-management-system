import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { enrollmentRoutes, enrollRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(enrollmentRoutes),
  ],
  declarations: [enrollRoutingComponents],
  providers: []
})
export class EnrollmentModule { }
