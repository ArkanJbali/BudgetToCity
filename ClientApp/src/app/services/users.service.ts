import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Users } from '../models/Users.model';
/**
 * The Users Service
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
/**
* The __httpOption__ to define the headers
*
*  __Example :__
*  headers: new HttpHeaders({
*    'Content-Type': 'application/json; charset=utf-8'
*  })
*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  myAppUrl: string;
  myApiUrl: string;
/**
* The "constructor"
*
* @param {HttpClient} http A HttpClient
*/
  constructor(private http: HttpClient) {
    this.myAppUrl = 'https://localhost:44391/';
    this.myApiUrl = 'api/Users/';
  }
/**
* Get All Users
*
*/
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Get User by Email
*
*/
  getUser(email: string): Observable<Users> {
    return this.http.get<Users>(this.myAppUrl + this.myApiUrl + email)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Add User
*
*/
  saveUser(user): Observable<Users> {
    console.log(user);
    return this.http.post<Users>(this.myAppUrl + this.myApiUrl, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Update User
*
*/
  updateUser(email: string, user): Observable<Users> {
    console.log(JSON.stringify(user));
    return this.http.put<Users>(this.myAppUrl + this.myApiUrl + email, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Delete User
*
*/
  deleteUser(Email: string): Observable<Users> {
    return this.http.delete<Users>(this.myAppUrl + this.myApiUrl + Email)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
