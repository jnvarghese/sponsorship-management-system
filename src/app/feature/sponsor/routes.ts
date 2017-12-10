import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { sponsorComponent } from './sponsor.component';
import { sponsorDetailComponent } from './sponsor-detail/sponsor-detail.component'

export const sponsorRoutes: Routes = [
    { path: 'sponsors', component: sponsorComponent },
    { path: 'createsponsor', component: sponsorDetailComponent },
    { path: 'studentdetail/:id', component: sponsorDetailComponent }    
  ];

export const sponsorRoutingComponents = [sponsorComponent, sponsorDetailComponent];
