import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PageNotFoundComponent,
  DashboardComponent
} from './feature/index';

import { EnrollmentComponent } from './feature/enrollment/enrollment.component';
import { InitResolve } from './feature/shared/resolver/init.resolve';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent,
      resolve: { initdata:  InitResolve}
    },
    { path: '**', component: PageNotFoundComponent }
  ];
