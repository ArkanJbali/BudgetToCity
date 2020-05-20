import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = 'https://localhost:44391/';
    this.myApiUrl = 'api/UsersPosts/';
  }

  getBlogPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getBlogPost(postID: number): Observable<Posts> {
    return this.http.get<Posts>(this.myAppUrl + this.myApiUrl + postID)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveBlogPost(userPost): Observable<Posts> {
    return this.http.post<Posts>(this.myAppUrl + this.myApiUrl, JSON.stringify(userPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateBlogPost(postId: number, userPost): Observable<Posts> {
    console.log(JSON.stringify(userPost));
    return this.http.put<Posts>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(userPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteBlogPost(postID: number): Observable<Posts> {
    return this.http.delete<Posts>(this.myAppUrl + this.myApiUrl + postID)
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
export interface Posts {
  postID: number;
  postTitle: string;
  postContent: string;
  postTime: Date;
  isApproved: number;
  userName: string;
  userEmail: string;
}
