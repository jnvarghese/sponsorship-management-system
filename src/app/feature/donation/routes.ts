import { Routes, RouterModule } from '@angular/router';
import { DonationComponent } from '../donation/donation.component';

export const donationRoutes: Routes = [

    { path: 'donation/add', component: DonationComponent },

  ];

export const donationRoutingComponents = [DonationComponent];
