import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { donationRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptsService } from '../shared/service/receipts.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [donationRoutingComponents],
  providers: [ ReceiptsService]
})
export class DonationModule { }
