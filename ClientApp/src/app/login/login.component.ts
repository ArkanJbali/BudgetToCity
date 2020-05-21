import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
//import { AuthenticationService } from './_services';
//import { User } from './_models';

imports: [
  BrowserModule,
  FormsModule
]
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  len: number
  Users: IUsers[] = [];

  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private httpClient: HttpClient, private toastrService: ToastrService, private router: Router) {
    http.get<IUsers[]>(baseUrl + 'api/Users').subscribe(result => {
      this.Users = result;
      this.len = this.Users.length;
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  login(username, password) {
    this.len = this.Users.length;
    for (var i = 0; i <= this.Users.length + 1; i++) {
      this.len = this.len - 1;
      if (this.len == -1) {
        console.log("email not found");
        break;
      }
      if (this.Users[i].email == username) {
        if (this.passwordCheck(password) == true) {
          console.log("yesss navigate to")
          break;
        }
        else {
          console.log("wrong password")
          break;
        }
         
      }
    }
  }

  passwordCheck(password) {
    for (var i = 0; i < this.Users.length; i++) {
      if (this.Users[i].password == password) 
       return true;     
    }
    return false;
  }
}

interface IUsers {
  email: string
  Phone: string
  Permession: string
  Role: string
  Fname: string
  Lname: string
  password: string
  isApproved: string
}



