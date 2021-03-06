import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent, manageSponsorRoutes, sponsorRoutes, studentRoutes, ManagesponsorshipComponent } from '../feature';
import { InitResolve } from '../feature/shared/resolver/init.resolve';
import { ViewSponsorshipComponent } from '../feature/viewsponsorship/viewsponsorship.component';
import { adminRoutes } from '../feature/admin/routes';
import { enrollmentRoutes } from '../feature/enrollment/routes';
import { UploadSponsorComponent } from '../feature/upload/upload-sponsor/upload-sponsor.component';
import { UploadStudentComponent } from '../feature/upload/upload-student/upload-student.component';
import { receiptsRoutes } from '../feature/receipts/routes';
import { SummaryComponent } from '../feature/summary/summary.component';
import { donationRoutes } from '../feature/donation/routes';
import { renewalRoutes } from '../feature/common/renewal/routes';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [           
            { path: 'dashboard', component: DashboardComponent, resolve: { initdata: InitResolve } },
            { path: 'view-enroll/:id', component: ViewSponsorshipComponent },
            { path: 'view-enroll', component: ViewSponsorshipComponent },
            { path: 'view-summary', component: SummaryComponent},
            { path: 'manage-sponsor', component: ManagesponsorshipComponent },
            { path: 'uploadsponsor', component: UploadSponsorComponent },
            { path: 'uploadstudent', component: UploadStudentComponent},
            ...adminRoutes,
            ...enrollmentRoutes,
            ...manageSponsorRoutes,
            ...sponsorRoutes,
            ...studentRoutes,
            ...receiptsRoutes,
            ...donationRoutes,
            ...renewalRoutes
        ]
    }
];
