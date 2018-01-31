import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../index';
import { Project } from '../../model/index';

@Injectable()
export class CommonResolve<T> implements Resolve<Array<T>> {

  url: any;

  constructor(private commonService: AdminService<T>, private route: ActivatedRoute) { }

  resolve() {
    /*this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];*/
        this.url = `/api/admin/projects/parish`;
      /*} else {
        this.url = `/api/admin/projects`;
      }
    });*/
    console.log( `Resolving with URL ${this.url}`)
    return this.commonService.get(this.url);
  }
}