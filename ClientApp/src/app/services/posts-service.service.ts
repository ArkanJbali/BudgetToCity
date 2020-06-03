import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
/**
 * The Posts Service
 */
@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
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
    this.myApiUrl = 'api/UsersPosts/';
  }
/**
* Get All Posts
*
*/
  getBlogPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Get Post by ID
*
*/
  getBlogPost(postID: number): Observable<Posts> {
    return this.http.get<Posts>(this.myAppUrl + this.myApiUrl + postID)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Add Manager
*
*/
  saveBlogPost(userPost): Observable<Posts> {
    return this.http.post<Posts>(this.myAppUrl + this.myApiUrl, JSON.stringify(userPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Update Post
*
*/
  updateBlogPost(postId: number, userPost): Observable<Posts> {
    return this.http.put<Posts>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(userPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
/**
* Delete Post
*
*/
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
/**
 * Posts interface
 *
 */
export interface Posts {
  postID: number;
  postTitle: string;
  postContent: string;
  postTime: Date;
  isApproved: number;
  userName: string;
  userEmail: string;
}
