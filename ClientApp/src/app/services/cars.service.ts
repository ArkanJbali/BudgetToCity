import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Users } from '../models/Users.model';
/**
 * The Cars Service
 */
@Injectable({
  providedIn: 'root'
})
export class CarsService {
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
    this.myApiUrl = 'api/Cars/';
  }
  /**
   * Get All Cars
   *
   */
  getCars(): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Get Car by Email
*
*/
  getCar(email: string): Observable<Cars> {
    return this.http.get<Cars>(this.myAppUrl + this.myApiUrl + email)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Add car
*
*/
  saveCar(car): Observable<Users> {
    console.log(car);
    return this.http.post<Users>(this.myAppUrl + this.myApiUrl, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Update car
*
*/
  updateCar(email: string, car): Observable<Users> {
    console.log(JSON.stringify(car));
    return this.http.put<Users>(this.myAppUrl + this.myApiUrl + email, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Delete car
*
*/
  deleteCar(Email: string): Observable<Cars> {
    return this.http.delete<Cars>(this.myAppUrl + this.myApiUrl + Email)
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
