import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';

export const sponsorRoutes: Routes = [
    { path: 'sponsor/list', component: SponsorComponent },
    { path: 'sponsor/add', component: SponsorDetailComponent },
    { path: 'sponsor/modify/:id', component: SponsorDetailComponent }
  ];

export const sponsorRoutingComponents = [SponsorComponent, SponsorDetailComponent];
