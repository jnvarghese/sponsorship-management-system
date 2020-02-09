import { Routes, RouterModule } from '@angular/router';
import { DonationComponent } from '../donation/donation.component';
import { DonationListComponent } from './donation-list/donation-list.component';

export const donationRoutes: Routes = [

    { path: 'donation/add', component: DonationComponent },
    { path: 'donation/list', component: DonationListComponent },

  ];

export const donationRoutingComponents = [DonationComponent, DonationListComponent];
