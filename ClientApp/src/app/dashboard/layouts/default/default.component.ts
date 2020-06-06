import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../modules/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '../../../models/Users.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;
  role;
  user: Users = {
    email: null, fname: null, lname: null, phone: null, isApproved: null, password: null, role: null, permession: null
  };
  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
      this.user.email = this.route.snapshot.paramMap.get('email');
      this.user.fname = this.route.snapshot.paramMap.get('fname');
      this.user.lname = this.route.snapshot.paramMap.get('lname');
      this.user.isApproved = Number(this.route.snapshot.paramMap.get('isApproved'));
      this.user.password = this.route.snapshot.paramMap.get('password');
      this.user.permession = Number(this.route.snapshot.paramMap.get('permession'));
      this.user.phone = this.route.snapshot.paramMap.get('phone');
      this.user.role = this.route.snapshot.paramMap.get('role');
    console.log(this.user);
    this.role = this.route.snapshot.paramMap.get('role');
    if (this.role == 'Admin') {
      this.router.navigate(['dashboard/admin']);
    }
    else if (this.role == 'Hotel') {
      this.router.navigate(['dashboard/manager']);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
  sideBarToggler(s) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
