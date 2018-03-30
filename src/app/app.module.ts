import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './login/guards/auth.guard';
import { LoginService } from './login/service/login.service';
import { AlertService } from './login/service/alert.service';
import { JQUERY_PROVIDER } from './feature';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { BrowserModule } from '@angular/platform-browser';

declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    LoginService,
    AlertService,
    JQUERY_PROVIDER,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
