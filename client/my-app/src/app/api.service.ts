import { Injectable, Output, EventEmitter } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  redirectUrl: string | undefined;
  // change the base to
  baseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public userlogin(name: any, password: any) {
    console.log({
      name: name,
      password: password,
    });
    return this.httpClient
      .post<any>(this.baseUrl + '/login.php', {
        name: name,
        password: password,
      })
      .pipe(
        map((res) => {
          this.setToken(res.login_id);
          this.setAdmin(res.admin);
          return res;
        }),
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);

          return throwError(err); //Rethrow it back to component
        })
      );
  }

  public userSignup(login_id: any, email: any, password: any, admin = 0) {
    console.log({
      login_id: login_id,
      email: email,
      password: password,
      admin: admin
    });
    return this.httpClient
      .post<any>(this.baseUrl + '/signup.php', {
        login_id: login_id,
        email: email,
        password: password,
        admin: admin,
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);

          return throwError(err); //Rethrow it back to component
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken === null) {
      return false;
    }
    return true;
  }

  setAdmin(admin: any) {
    localStorage.setItem('admin', admin.toString());
  }

  isAdmin() {
    if (localStorage.getItem('admin') !== '1') {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }
}
