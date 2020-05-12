import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentComponent, EnrollSponseeComponent, EnrollSponsorComponent, ReviewComponent } from './index';
import { SharedModule } from '../../shared/shared.module';
import { ReleaseSponsorshipComponent } from './release-sponsorship/release-sponsorship.component';
import { ExpiredSponsorshipComponent } from './expired-sponsorship/expired-sponsorship.component';

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
    ReviewComponent,
    ReleaseSponsorshipComponent,
    ExpiredSponsorshipComponent,
  ],
  providers: []
})
export class EnrollmentModule { }
