import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { receiptsRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiptsService } from '..';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [receiptsRoutingComponents],
  providers: [ ReceiptsService]
})
export class ReceiptsModule { }
