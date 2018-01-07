import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sponsorRoutes, sponsorRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(sponsorRoutes),
  ],
  declarations: [sponsorRoutingComponents],
  providers: []
})
export class SponsorModule { }
