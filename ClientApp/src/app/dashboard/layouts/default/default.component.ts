import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../modules/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;
  role;
  constructor(private router: Router) { }


  ngOnInit() {
    this.role = 'Admin';
    if (this.role == 'Admin') {
      this.router.navigate(['dashboard/admin']);
    }
    else if (this.role == 'Hotel') {
      this.router.navigate(['dashboard/manager']);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
