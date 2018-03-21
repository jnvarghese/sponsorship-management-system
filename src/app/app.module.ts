import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './core/in-memory-data-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  StudentService,
  SponsorService,
  DashboardComponent,
  PageNotFoundComponent,
  HeaderComponent,
  FooterComponent,
  JQUERY_PROVIDER,
  EnrollService,
  InitService,
  AdminService} from './feature/index';
import { SponsorModule } from './feature/sponsor/sponsor.module';
import { EnrollmentModule } from './feature/enrollment/enrollment.module';
import { ManageSponsorShipModule } from './feature/managesponsorship/managesponsorship.module';
import { StudentModule } from './feature/student/student.module';
import { AppRoutingModule } from './app-routing.module';
import { InitResolve } from './feature/shared/resolver/init.resolve';
import { DateFormatPipe } from './shared/date.format.pipe';
import { DashboardService } from './feature/shared/service/dashboard.service';
import { AdminModule } from './feature/admin/admin.module';
import { PageDateFormatPipe } from './shared/page-date-format.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ViewSponsorshipComponent } from './feature/viewsponsorship/viewsponsorship.component';
import { UploadFileComponent } from './feature/upload-file/upload-file.component';
import { UploadService } from './feature/shared/service/upload.service';

declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ViewSponsorshipComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StudentModule,
    SponsorModule,
    EnrollmentModule,
    ManageSponsorShipModule,
    AdminModule,
    AppRoutingModule,
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
    JQUERY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
