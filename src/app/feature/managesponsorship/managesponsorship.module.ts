import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { manageSponsorRoutes, manageSponsorRoutingComponents } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(manageSponsorRoutes),
  ],
  declarations: [manageSponsorRoutingComponents],
  providers: []
})
export class ManageSponsorShipModule { }
