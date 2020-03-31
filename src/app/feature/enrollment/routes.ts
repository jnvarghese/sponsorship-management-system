import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollmentComponent, ReleaseSponsorshipComponent } from './index';

export const enrollmentRoutes: Routes = [  
    { path: 'enroll', component: EnrollmentComponent },  
    { path: 'release-sponsorship', component: ReleaseSponsorshipComponent },  
  ];

