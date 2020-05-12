import { Routes } from '@angular/router';
import { EnrollmentComponent, ReleaseSponsorshipComponent } from './index';
import { ExpiredSponsorshipComponent } from './expired-sponsorship/expired-sponsorship.component';

export const enrollmentRoutes: Routes = [  
    { path: 'enroll', component: EnrollmentComponent },  
    { path: 'release-sponsorship', component: ReleaseSponsorshipComponent },  
    { path: 'view-expired-sponsorship', component: ExpiredSponsorshipComponent }, 
  ];

