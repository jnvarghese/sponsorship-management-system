import { Routes, RouterModule } from '@angular/router';
import { ReceiptsComponent } from './receipts.component';
import { ReceiptsdetailComponent } from './receipts-detail/receiptsdetail.component';

export const receiptsRoutes: Routes = [
    { path: 'receipts/list/:parishId', component: ReceiptsComponent },
    { path: 'receipts/list', component: ReceiptsComponent },
    { path: 'receipts/add', component: ReceiptsdetailComponent },
    { path: 'receipts/modify/:id/:parishId', component: ReceiptsdetailComponent }
  ];

export const receiptsRoutingComponents = [ReceiptsComponent, ReceiptsdetailComponent];
