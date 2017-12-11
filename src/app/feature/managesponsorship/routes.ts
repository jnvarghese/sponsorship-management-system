import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagesponsorshipComponent } from './managesponsorship.component';
import { SponsorActionComponent } from './sponsor-action/sponsor-action.component';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';

export const manageSponsorRoutes: Routes = [  {
    path : 'manage-sponsor', component : ManagesponsorshipComponent, children : [
      { path: 'sponsor-manage-list', component : SponsorListComponent, outlet: 'list'},
      { path: ':id', component : SponsorActionComponent, outlet: 'detail'}
    ]
  },
  ];

export const manageSponsorRoutingComponents = [
  ManagesponsorshipComponent,
  SponsorActionComponent,
  SponsorListComponent
];
