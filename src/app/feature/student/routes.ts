import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

export const studentRoutes: Routes = [
    { path: 'students', component: StudentComponent },
    { path: 'studentdetail/:id', component: StudentDetailComponent },
    { path: 'createStudent', component: StudentDetailComponent }
  ];

export const studentRoutingComponents = [StudentComponent, StudentDetailComponent];
