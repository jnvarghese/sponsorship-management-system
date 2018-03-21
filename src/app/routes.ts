import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PageNotFoundComponent,
  DashboardComponent
} from './feature/index';

import { EnrollmentComponent } from './feature/enrollment/enrollment.component';
import { InitResolve } from './feature/shared/resolver/init.resolve';
import { ViewSponsorshipComponent } from './feature/viewsponsorship/viewsponsorship.component';
import { UploadFileComponent } from './feature/upload-file/upload-file.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent, resolve: {initdata: InitResolve}},
    { path: 'view-enroll', component: ViewSponsorshipComponent},
    { path: 'uploadfile', component: UploadFileComponent},
    { path: '**', component: PageNotFoundComponent }
  ];
