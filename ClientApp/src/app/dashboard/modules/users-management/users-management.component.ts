import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { Users } from '../../../models/Users.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DashboardService } from '../dashboard.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users: Users[];
  currentUser: Users = { email: null, phone: null, permession: null, role: null, fname: null, lname: null, password: null, isApproved: null };
  displayedColumns: string[] = ['Email', 'Phone', 'Permession', 'Role', 'Fname', 'Lname', 'Password', 'isApproved', 'Edit'];
  dataSource = new MatTableDataSource<Users>(this.users);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private toastrService: ToastrService, private usersService: UsersService) {
    this.getUsers();
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  refreshTable() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.dataSource.data = data;
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get users'));
    this.currentUser = { email: null, phone: null, permession: null, role: null, fname: null, lname: null, password: null, isApproved: null };
  }
  getUsers() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Users>(this.users);
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get users'));
  }
  updateUser(user) {
    this.currentUser = user;
    console.log('update', user);
  }
  deleteUser(email) {
    this.usersService.deleteUser(email).subscribe((data) => {
      console.log('res: ', data);
      this.refreshTable();
    }, error => console.log(error));

  }
  updateUserRow(form) {
    console.log('Form: ', form.value);

    if (this.currentUser && this.currentUser.email) {
      form.value.email = this.currentUser.email;
      this.usersService.updateUser(form.value.email, form.value)
        .subscribe((data) => {
          console.log(data);

          this.toastrService.success('This Post is updated Successfully', 'Update');
        }, error => console.log(error));

      this.refreshTable();
    } 
    form.reset();
  }
  createUser(form) {
    this.usersService.saveUser(form.value).pipe(first()).subscribe((data) => {
      this.toastrService.success('Create successful', 'Create new user');
    },
      error => {
        this.toastrService.error(error + 'Create failed');
      });
    this.refreshTable();
    form.reset();
  }
}
