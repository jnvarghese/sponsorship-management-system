import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component'

export const sponsorRoutes: Routes = [
    { path: 'sponsors', component: SponsorComponent },
    { path: 'createsponsor', component: SponsorDetailComponent },
    { path: 'studentdetail/:id', component: SponsorDetailComponent }    
  ];

export const sponsorRoutingComponents = [SponsorComponent, SponsorDetailComponent];
