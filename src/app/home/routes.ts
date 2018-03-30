import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent, manageSponsorRoutes, sponsorRoutes, studentRoutes, ManagesponsorshipComponent } from '../feature';
import { InitResolve } from '../feature/shared/resolver/init.resolve';
import { ViewSponsorshipComponent } from '../feature/viewsponsorship/viewsponsorship.component';
import { adminRoutes } from '../feature/admin/routes';
import { enrollmentRoutes } from '../feature/enrollment/routes';
import { UploadFileComponent } from '../feature/upload-file/upload-file/upload-file.component';
import { UploadFileListComponent } from '../feature/upload-file/upload-file-list.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [           
            { path: 'dashboard', component: DashboardComponent, resolve: { initdata: InitResolve } },
            { path: 'view-enroll', component: ViewSponsorshipComponent },
            { path: 'manage-sponsor', component: ManagesponsorshipComponent },
            { path: 'uploadfilelist', component: UploadFileListComponent },
            { path: 'uploadfile', component: UploadFileComponent},
            ...adminRoutes,
            ...enrollmentRoutes,
            ...manageSponsorRoutes,
            ...sponsorRoutes,
            ...studentRoutes
        ]
    }
];
