import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PageNotFoundComponent,
  DashboardComponent
} from './feature/index';

import { EnrollmentComponent } from './feature/enrollment/enrollment.component';
import { InitResolve } from './feature/shared/resolver/init.resolve';
import { ViewSponsorshipComponent } from './feature/viewsponsorship/viewsponsorship.component';
import { UploadFileComponent } from './feature/upload-file/upload-file.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/guards/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },   
    { path: '**', redirectTo: '' }
  ];
