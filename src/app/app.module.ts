import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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
  EnrollService} from './feature/index';
import { SponsorModule } from './feature/sponsor/sponsor.module';
import { EnrollmentModule } from './feature/enrollment/enrollment.module';
import { ManageSponsorShipModule } from './feature/managesponsorship/managesponsorship.module';
import { StudentModule } from './feature/student/student.module';
import { AppRoutingModule } from './app-routing.module';


declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,    
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,    
    StudentModule,
    SponsorModule,
    EnrollmentModule,
    ManageSponsorShipModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(
      InMemoryDataService, { delay: 600  }
    ), // https://angular.io/tutorial/toh-pt6,

  ],
  providers: [
    StudentService,
    SponsorService,
    EnrollService,
    JQUERY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
