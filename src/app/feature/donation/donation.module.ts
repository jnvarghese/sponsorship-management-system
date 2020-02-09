import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { donationRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptsService } from '../shared/service/receipts.service';
import { DonationsComponent } from './donation-list/donations/donations.components';
import { SponsorComponent } from './donation-list/donations/sponsor/sponsor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [donationRoutingComponents, DonationsComponent, SponsorComponent],
  providers: [ ReceiptsService]
})
export class DonationModule { }
