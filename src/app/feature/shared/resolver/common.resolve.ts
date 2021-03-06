import { Injectable } from '@angular/core';
import { Resolve, Params, ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '../index';
import { Project } from '../../model/index';

@Injectable()
export class CommonResolve<T> implements Resolve<Array<T>> {

  url: any;

  constructor(private commonService: AdminService<T>) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this.url = `/api/admin/projects/parish`;
    //this.url = '/api/admin/parishes';
    console.log( `Resolving with URL ${this.url} and ${id}`);
    return this.commonService.getById(this.url, +id);
  }
}
