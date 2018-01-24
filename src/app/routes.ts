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
    {
      path: 'admin',
      loadChildren: './feature/admin/admin.module#AdminModule'
    },
    { path: '**', component: PageNotFoundComponent }
  ];
/*
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
*/