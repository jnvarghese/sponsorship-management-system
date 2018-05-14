import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
@Injectable()
export class LoginService {

  baseUrl: 'api/token/generate-token';

  constructor(private http: HttpClient) {
  }

  /*attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    return this.http.post(this.baseUrl, credentials);
  }*/

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/token/generate-token', JSON.stringify({ username: username, password: password }), { headers })
        .map(user => {        
            // login successful if there's a jwt token in the response
            if (user && user.credentials) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', user.credentials);
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('currentUser', JSON.stringify(user));              
               }

            return user;
        })
        .catch((error: any) => {
          console.log(' ----error ---',error);
         
  
          return Observable.throw(error.statusText);
      });
  ;
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
}

}
