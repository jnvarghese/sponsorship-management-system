import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PageNotFoundComponent,
  DashboardComponent,
  studentRoutes,
  sponsorRoutes,
  sponsorRoutingComponents,
  studentRoutingComponents,
  manageSponsorRoutes,
  manageSponsorRoutingComponents,
} from './feature/index';

import { EnrollmentComponent } from './feature/enrollment/enrollment.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'enroll', component: EnrollmentComponent },
    ...studentRoutes,
    ...sponsorRoutes,
    ...manageSponsorRoutes,
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], // ,{ enableTracing: true }
    exports: [RouterModule],
})
export class AppRoutingModule { }
export const appRoutingComponents = [
  DashboardComponent,
  EnrollmentComponent,
  PageNotFoundComponent,
  studentRoutingComponents,
  sponsorRoutingComponents,
  manageSponsorRoutingComponents
];
