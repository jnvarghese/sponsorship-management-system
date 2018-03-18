import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InitService } from '../index';
import { Initializer, Center } from '../../model/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class InitResolve implements Resolve<Initializer> {

  constructor(private initService: InitService) {}

  resolve() {
    return this.initService.getInitializerData();
  }
}