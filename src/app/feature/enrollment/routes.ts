import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollSponsorComponent, EnrollSponseeComponent } from './index';
import { EnrollmentComponent } from './enrollment.component';

export const enrollmentRoutes: Routes = [  
    { path: 'enroll/sponsor', component: EnrollSponsorComponent },
    { path: 'enroll/sponsee', component: EnrollSponseeComponent },
    { path: 'enroll', component: EnrollmentComponent },  
    //{ path: 'sponsordetail/:id', component: SponsorDetailComponent }
  ];

export const enrollRoutingComponents = [EnrollSponsorComponent, EnrollSponseeComponent, EnrollmentComponent];
