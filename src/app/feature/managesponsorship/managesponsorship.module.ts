import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { manageSponsorRoutes, manageSponsorRoutingComponents } from './routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [manageSponsorRoutingComponents],
  providers: []
})
export class ManageSponsorShipModule { }
