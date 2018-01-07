import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentRoutes, studentRoutingComponents } from './routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(studentRoutes),
  ],
  declarations: [studentRoutingComponents],
  providers: []
})
export class StudentModule { }
