import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpEvent } from "@angular/common/http";
import 'rxjs/add/operator/do';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginService } from "./login/service/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authService: LoginService;

    constructor(private injector: Injector, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      this.authService = this.injector.get(LoginService); // get it here within intercept

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
      return next.handle(request).do(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
           
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
        }
      );
  
    }
  }