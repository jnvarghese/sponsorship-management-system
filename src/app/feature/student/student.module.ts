import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BoxDonutChartComponent } from '../common/d3/box-donut-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [studentRoutingComponents, BoxDonutChartComponent],
  providers: []
})
export class StudentModule { }
