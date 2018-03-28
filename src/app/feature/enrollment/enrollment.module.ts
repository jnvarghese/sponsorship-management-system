import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentComponent, EnrollSponseeComponent, EnrollSponsorComponent, ReviewComponent } from './index';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    EnrollmentComponent,
    EnrollSponseeComponent,
    EnrollSponsorComponent,
    ReviewComponent
  ],
  providers: []
})
export class EnrollmentModule { }
