import { NgModule } from '@angular/core';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent, FooterComponent, DashboardComponent, PageNotFoundComponent, AdminService, StudentService, SponsorService, EnrollService, InitService } from '../feature';
import { StudentModule } from '../feature/student/student.module';
import { SponsorModule } from '../feature/sponsor/sponsor.module';
import { EnrollmentModule } from '../feature/enrollment/enrollment.module';
import { ManageSponsorShipModule } from '../feature/managesponsorship/managesponsorship.module';
import { AdminModule } from '../feature/admin/admin.module';
import { ViewSponsorshipComponent } from '../feature/viewsponsorship/viewsponsorship.component';

import { DashboardService } from '../feature/shared/service/dashboard.service';
import { DateFormatPipe } from '../shared/date.format.pipe';
import { PageDateFormatPipe } from '../shared/page-date-format.pipe';
import { InitResolve } from '../feature/shared/resolver/init.resolve';

import { UploadSponsorComponent } from '../feature/upload/upload-sponsor/upload-sponsor.component';
import { UploadStudentComponent } from '../feature/upload/upload-student/upload-student.component';
import { UploadService } from '../feature/upload/shared/upload.service';
import { ClosableWellComponent } from '../feature/dashboard/closable-well.component';
import { ReceiptsModule } from '../feature/receipts/receipts.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      StudentModule,
      SponsorModule,
      EnrollmentModule,
      ReceiptsModule,
      ManageSponsorShipModule,
      AdminModule,
      RouterModule.forChild(routes),
    ],
    declarations: [
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      DashboardComponent,
      ClosableWellComponent,
      ViewSponsorshipComponent,
      PageNotFoundComponent,
      UploadSponsorComponent,
      UploadStudentComponent
    ],
    providers: [
      AdminService,
      DashboardService,
      DateFormatPipe,
      PageDateFormatPipe,
      StudentService,
      SponsorService,
      EnrollService,
      InitResolve,
      InitService,
      UploadService,
    ]
  })
  
  export class HomeModule { }
  