import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Users } from '../models/Users.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = 'https://localhost:44391/';
    this.myApiUrl = 'api/Cars/';
  }
  getCars(): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getCar(email: string): Observable<Cars> {
    return this.http.get<Cars>(this.myAppUrl + this.myApiUrl + email)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveCar(car): Observable<Users> {
    console.log(car);
    return this.http.post<Users>(this.myAppUrl + this.myApiUrl, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateCar(email: string, car): Observable<Users> {
    console.log(JSON.stringify(car));
    return this.http.put<Users>(this.myAppUrl + this.myApiUrl + email, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

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
