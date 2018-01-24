import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InitService } from '../index';
import { Initializer } from '../../model/index';

@Injectable()
export class InitResolve implements Resolve<Initializer> {

  constructor(private initService: InitService) {}

  resolve() {
    return this.initService.getInitializerData();
  }
}