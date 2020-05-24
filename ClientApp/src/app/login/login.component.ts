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
  currentUser: IUsers;
  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private httpClient: HttpClient, private toastrService: ToastrService, private router: Router) {
    http.get<IUsers[]>(baseUrl + 'api/Users').subscribe(result => {
      this.Users = result;
      this.len = this.Users.length;
      console.log(result);
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
        if (this.passwordCheckLog(password) == true && this.Users[i].isApproved == 1) {
          this.currentUser = this.Users[i];
          //console.log(this.currentUser);
          this.router.navigate(['dashboard', this.currentUser]);
          break;
        }
        if (this.Users[i].isApproved == 0) {
          this.toastrService.warning("your account in progress to get approved from administration.", "No account approval");
          break;
        }
        else {
          this.toastrService.warning("Your Email/password is invalid." , "Invalid Entered Data");
          break;
        }
         
      }
    }
  }
  passwordCheckLog(password) {
    for (var i = 0; i < this.Users.length; i++) {
      if (this.Users[i].password == password) {
        //this.toastrService.info("Your password is: '" + this.Users[i].password + "'", "Password");
        return true;
      }
    }
    return false;
  }
  passwordCheck(email) {
    for (var i = 0; i < this.Users.length; i++) {
      if (this.Users[i].email == email) {
        console.log(this.Users[i].password);
        this.toastrService.info("Your password is: '" + this.Users[i].password + "'", "Password");
        return true;
      }
    }
    this.toastrService.info("There is no Email registed like: '"+email+"'", "Email not founded!");
    return false;
  }
}

interface IUsers {
  email: string
  Phone: string
  Permession: number
  Role: string
  Fname: string
  Lname: string
  password: string
  isApproved: number
}



