import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './service/login.service';
import { TokenStorage } from './service/token.storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService,
    private alertService: AlertService) { }

  username: string;
  password: string;


  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

login() {
    this.loading = true;
    console.log('login');

   
    this.authService.login(this.model.username, this.model.password)
        .subscribe(
            data => {               
                //this.router.navigate([this.returnUrl]);
                this.router.navigate(['/home/dashboard']);
            },
            error => {               
                this.alertService.error(error);
                this.loading = false;
            },
            ()=>{ this.loading = false;});
}

}
