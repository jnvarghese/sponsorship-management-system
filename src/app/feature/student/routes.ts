import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ImageUploadComponent } from './imageupload.component';

export const studentRoutes: Routes = [
    { path: 'student/list', component: StudentComponent },
    { path: 'student/modify/:id', component: StudentDetailComponent },
    { path: 'student/add', component: StudentDetailComponent }
  ];

export const studentRoutingComponents = [StudentComponent, StudentDetailComponent, ImageUploadComponent];
