import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyComponent, ProjectComponent, ParishComponent } from './index';

const routes: Routes = [
    {path: 'admin/agency', component: AgencyComponent },
    {path: 'admin/project', component: ProjectComponent },
    {path: 'admin/parish', component: ParishComponent },
    /*{
        path: '',
        component: Feature5Component,
        children: [
          { path: 'about', component: AboutHomeComponent, outlet: 'abt' }, // url: about/
          { path: 'item', component: AboutItemComponent, outlet:'itm' } // url: about/item
        ]
        path: '/admin/agency', component: AgencyComponent
      }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }