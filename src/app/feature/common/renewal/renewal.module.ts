import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { renewlRoutingComponents } from './routes';
import { RenewalService } from '../../shared/service/renewal.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [renewlRoutingComponents],
  providers: [RenewalService]
})
export class RenewalModule { }
