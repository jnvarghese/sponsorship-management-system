import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './core/in-memory-data-service';
import { appRoutes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  SponsorComponent,
  SponsorDetailComponent,
  StudentDetailComponent,
  StudentService,
  SponsorService,
  DashboardComponent,
  PageNotFoundComponent,
  HeaderComponent,
  FooterComponent,
  JQUERY_PROVIDER} from './feature/index';
import { appRoutingComponents, AppRoutingModule } from './index';
import { EnrollmentComponent } from './feature/enrollment/enrollment.component';

declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    appRoutingComponents,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    EnrollmentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // The HttpClientInMe,moryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    InMemoryWebApiModule.forRoot(
      InMemoryDataService, { delay: 600  }
    ) // https://angular.io/tutorial/toh-pt6
  ],
  providers: [
    StudentService,
    SponsorService,
    JQUERY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
