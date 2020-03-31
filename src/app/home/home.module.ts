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
import { SummaryComponent } from '../feature/summary/summary.component';
import { LineGraphComponent } from '../feature/dashboard/linegraph.component';
import { DonutChartComponent } from '../feature/dashboard/donutchart.component';
import { BarLineChartComponent } from '../feature/dashboard/barlinechart.component';
import { BarChartComponent } from '../feature/dashboard/barchart.component';
import { DonationModule } from '../feature/donation/donation.module';
import { BoxDonutChartComponent } from '../feature/common/d3/box-donut-chart.component';
import { KeysPipe } from '../shared/keyspipe';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      StudentModule,
      SponsorModule,
      EnrollmentModule,
      ReceiptsModule,
      DonationModule,
      ManageSponsorShipModule,
      AdminModule,
      RouterModule.forChild(routes),
    ],
    declarations: [
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      BarChartComponent,
      BarLineChartComponent,
      LineGraphComponent,
      DonutChartComponent,
      DashboardComponent,
      ClosableWellComponent,
      ViewSponsorshipComponent,
      SummaryComponent,
      PageNotFoundComponent,
      UploadSponsorComponent,
      UploadStudentComponent,
      //BoxDonutChartComponent
    ],
    providers: [
      AdminService,
      DashboardService,
      DateFormatPipe,
      PageDateFormatPipe,
      KeysPipe,
      StudentService,
      SponsorService,
      EnrollService,
      InitResolve,
      InitService,
      UploadService,
    ]
  })
  
  export class HomeModule { }
  