import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
/**
 * The Alert Service
 */
@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }
  /**
  * Display success message
  *
  * @param {message} message A String
  * @param {keepAfterNavigationChange} keepAfterNavigationChange A Boolean
  * 
  */
  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }
  /**
  * Display error message
  *
  * @param {message} message A String
  * @param {keepAfterNavigationChange} keepAfterNavigationChange A Boolean
  *
  */
  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }
  /**
   * Display a message
  */
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
