import { Component, OnInit } from '@angular/core';
import { DefaultComponent } from '../../../layouts/default/default.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role;
  fname;
  lname;
  email;
  constructor(private defaultc: DefaultComponent) { }

  ngOnInit() {

      this.role = this.defaultc.user.role;
      this.fname = this.defaultc.user.fname;
      this.lname = this.defaultc.user.lname;
      this.email = this.defaultc.user.email;
    
    //this.role = 'Hotel';
    //this.role = 'Admin';
  }

}
